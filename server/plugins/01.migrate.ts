import { count } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { coupons, faqs, plans, products, reviews, users } from '../database/schema'
import { seedCoupons, seedFaqs, seedPlans, seedProducts, seedReviews } from '../database/seed-data'
import { db } from '../utils/db'

export default defineNitroPlugin(async () => {
  // 1. Run migrations
  await migrate(db, { migrationsFolder: 'server/database/migrations' })
  // eslint-disable-next-line no-console
  console.log('[db] migrations applied')

  // 2. Seed products
  await db.insert(products).values(seedProducts).onConflictDoNothing()

  // 3. Seed plans (only if table is empty to avoid duplicates with autoIncrement id)
  const planRows = await db.select({ total: count() }).from(plans)
  if (planRows[0]!.total === 0) {
    await db.insert(plans).values(seedPlans)
  }

  // 4. Seed reviews (only if table is empty)
  const reviewRows = await db.select({ total: count() }).from(reviews)
  if (reviewRows[0]!.total === 0) {
    await db.insert(reviews).values(seedReviews)
  }

  // 5. Seed FAQs (only if table is empty)
  const faqRows = await db.select({ total: count() }).from(faqs)
  if (faqRows[0]!.total === 0) {
    await db.insert(faqs).values(seedFaqs)
  }

  // 6. Seed admin user
  const hashedPassword = await hashPassword('admin1234')
  await db
    .insert(users)
    .values({
      email: 'admin@travel.fun',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    })
    .onConflictDoNothing()

  // 7. Seed coupons
  await db.insert(coupons).values(seedCoupons).onConflictDoNothing()

  // eslint-disable-next-line no-console
  console.log(
    `[db] seed complete: ${seedProducts.length} products, ${seedPlans.length} plans, ${seedReviews.length} reviews, ${seedFaqs.length} faqs`,
  )
})
