import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { products } from './products'

export const faqs = sqliteTable('faqs', {
  id: int().primaryKey({ autoIncrement: true }),
  productId: text('product_id').references(() => products.id),
  question: text().notNull(),
  answer: text().notNull(),
  sortOrder: int('sort_order').default(0),
})
