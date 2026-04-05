import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { users } from '../../database/schema'
import { db } from '../../utils/db'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse)

  const existing = await db.select().from(users).where(eq(users.email, body.email)).get()
  if (existing) {
    throw createError({ statusCode: 409, message: '此 email 已被註冊' })
  }

  const hashedPassword = await hashPassword(body.password)

  const [user] = await db
    .insert(users)
    .values({
      email: body.email,
      password: hashedPassword,
      name: body.name,
    })
    .returning()

  await setUserSession(event, {
    user: { id: user!.id, email: user!.email, name: user!.name ?? '' },
    loggedInAt: Date.now(),
  })

  return { success: true, message: '註冊成功' }
})
