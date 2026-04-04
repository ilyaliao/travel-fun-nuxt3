import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { cartItems, coupons } from '../../database/schema'
import { db } from '../../utils/db'

const bodySchema = z.object({
  data: z.object({
    code: z.string(),
  }),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { data } = await readValidatedBody(event, bodySchema.parse)

  const coupon = await db.select().from(coupons).where(eq(coupons.code, data.code)).get()
  if (!coupon || !coupon.isEnabled) {
    throw createError({ statusCode: 400, message: '優惠券無效' })
  }
  if (coupon.dueDate && coupon.dueDate < Math.floor(Date.now() / 1000)) {
    throw createError({ statusCode: 400, message: '優惠券已過期' })
  }

  await db.update(cartItems).set({ couponCode: data.code }).where(eq(cartItems.userId, user.id))

  return {
    success: true,
    message: `已套用優惠券 ${coupon.title}`,
    data: { final_total: 0 },
  }
})
