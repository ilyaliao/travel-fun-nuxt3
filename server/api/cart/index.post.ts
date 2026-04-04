import { z } from 'zod'
import { cartItems } from '../../database/schema'
import { db } from '../../utils/db'

const bodySchema = z.object({
  data: z.object({
    product_id: z.string(),
    qty: z.number().int().min(1),
    buy_date: z.number(),
  }),
})

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { data } = await readValidatedBody(event, bodySchema.parse)

  await db.insert(cartItems).values({
    userId: user.id,
    productId: data.product_id,
    qty: data.qty,
    buyDate: data.buy_date,
  })

  return { success: true, message: '已加入購物車' }
})
