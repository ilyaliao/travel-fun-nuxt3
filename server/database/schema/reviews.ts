import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { products } from './products'

export const reviews = sqliteTable('reviews', {
  id: int().primaryKey({ autoIncrement: true }),
  productId: text('product_id').references(() => products.id),
  userName: text('user_name').notNull(),
  rating: int().notNull(),
  comment: text().notNull(),
  createdAt: int('created_at').$defaultFn(() => Math.floor(Date.now() / 1000)),
})
