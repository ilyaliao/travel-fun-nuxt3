import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { coupons } from '../../database/schema'
import { db } from '../../utils/db'

const bodySchema = z.object({
  code: z.string().min(1),
  orderAmount: z.number().min(0),
})

export default defineEventHandler(async (event) => {
  const { code, orderAmount } = await readValidatedBody(event, bodySchema.parse)

  const coupon = await db.query.coupons.findFirst({
    where: eq(coupons.code, code.toUpperCase()),
  })

  if (!coupon) {
    throw createError({ statusCode: 400, message: '無效的優惠券代碼' })
  }

  if (!coupon.isEnabled) {
    throw createError({ statusCode: 400, message: '此優惠券已停用' })
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    throw createError({ statusCode: 400, message: '此優惠券已過期' })
  }

  if (coupon.minAmount && orderAmount < coupon.minAmount) {
    throw createError({ statusCode: 400, message: '未達最低消費門檻' })
  }

  const discountAmount
    = coupon.type === 'percent' ? Math.round((orderAmount * coupon.value) / 100) : coupon.value

  return {
    success: true,
    message: '優惠券套用成功',
    code: coupon.code,
    title: coupon.title,
    type: coupon.type as 'percent' | 'fixed',
    value: coupon.value,
    discountAmount: Math.min(discountAmount, orderAmount),
  }
})
