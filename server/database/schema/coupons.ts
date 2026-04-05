import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const coupons = sqliteTable('coupons', {
  id: int().primaryKey({ autoIncrement: true }),
  code: text().notNull().unique(),
  title: text().notNull(),
  type: text({ enum: ['percent', 'fixed'] }).notNull(),
  value: int().notNull(),
  minAmount: int('min_amount').default(0),
  isEnabled: int('is_enabled').default(1),
  expiresAt: text('expires_at'),
  createdAt: int('created_at').$defaultFn(() => Math.floor(Date.now() / 1000)),
})
