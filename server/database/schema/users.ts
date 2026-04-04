import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  password: text().notNull(),
  name: text(),
  tel: text(),
  address: text(),
  role: text().$type<'user' | 'admin'>().default('user'),
  createdAt: int('created_at').$defaultFn(() => Math.floor(Date.now() / 1000)),
})
