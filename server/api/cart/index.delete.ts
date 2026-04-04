import { eq } from 'drizzle-orm'
import { cartItems } from '../../database/schema'
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  await db.delete(cartItems).where(eq(cartItems.userId, user.id))
  return { success: true, message: '已清空購物車' }
})
