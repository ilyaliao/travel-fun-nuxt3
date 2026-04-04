import { eq } from "drizzle-orm";
import { plans, products } from "~/server/database/schema";
import { db } from "~/server/utils/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")!;

  const product = await db.select().from(products).where(eq(products.id, id)).get();
  if (!product) {
    throw createError({ statusCode: 404, message: "找不到此商品" });
  }

  const productPlans = await db.select().from(plans).where(eq(plans.productId, id)).all();

  return {
    success: true,
    product: { ...product, plans: productPlans },
  };
});
