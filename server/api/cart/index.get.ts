import { eq } from "drizzle-orm";
import { cartItems, coupons, products } from "~/server/database/schema";
import { db } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const items = await db.select().from(cartItems).where(eq(cartItems.userId, user.id)).all();

  const carts = await Promise.all(
    items.map(async (item) => {
      const product = await db.select().from(products).where(eq(products.id, item.productId)).get();
      const price = product?.price || 0;
      const total = price * item.qty;

      let finalTotal = total;
      if (item.couponCode) {
        const coupon = await db
          .select()
          .from(coupons)
          .where(eq(coupons.code, item.couponCode))
          .get();
        if (
          coupon &&
          coupon.isEnabled &&
          (!coupon.dueDate || coupon.dueDate > Math.floor(Date.now() / 1000))
        ) {
          finalTotal = Math.round(total * (coupon.percent / 100));
        }
      }

      return {
        id: String(item.id),
        product_id: item.productId,
        product: product || undefined,
        qty: item.qty,
        buy_date: item.buyDate,
        coupon_code: item.couponCode,
        total,
        final_total: finalTotal,
      };
    }),
  );

  const total = carts.reduce((sum, c) => sum + c.total, 0);
  const finalTotal = carts.reduce((sum, c) => sum + c.final_total, 0);

  return {
    success: true,
    data: { carts, total, final_total: finalTotal },
  };
});
