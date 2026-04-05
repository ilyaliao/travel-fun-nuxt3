import { count } from 'drizzle-orm'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { coupons, faqs, plans, products, reviews, users } from '../database/schema'
import { seedFaqs, seedPlans, seedProducts, seedReviews } from '../database/seed-data'
import { db } from '../utils/db'

export default defineNitroPlugin(async () => {
  // 1. Run migrations
  await migrate(db, { migrationsFolder: 'server/database/migrations' })
  // eslint-disable-next-line no-console
  console.log('[db] migrations applied')

  // 2. Seed products
  await db.insert(products).values(seedProducts).onConflictDoNothing()

  // 3. Seed plans (only if table is empty to avoid duplicates with autoIncrement id)
  const [{ total: planCount }] = await db.select({ total: count() }).from(plans)
  if (planCount === 0) {
    await db.insert(plans).values(seedPlans)
  }

  // 4. Seed reviews (only if table is empty)
  const [{ total: reviewCount }] = await db.select({ total: count() }).from(reviews)
  if (reviewCount === 0) {
    await db.insert(reviews).values(seedReviews)
  }

  // 5. Seed FAQs (only if table is empty)
  const [{ total: faqCount }] = await db.select({ total: count() }).from(faqs)
  if (faqCount === 0) {
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
  await db
    .insert(coupons)
    .values([
      {
        code: 'TRAVEL10',
        title: '旅遊九折券',
        percent: 90,
        dueDate: Math.floor(Date.now() / 1000) + 86400 * 365,
        isEnabled: 1,
      },
      {
        code: 'FUN20',
        title: '歡樂八折券',
        percent: 80,
        dueDate: Math.floor(Date.now() / 1000) + 86400 * 365,
        isEnabled: 1,
      },
    ])
    .onConflictDoNothing()

  // eslint-disable-next-line no-console
  console.log(
    `[db] seed complete: ${seedProducts.length} products, ${seedPlans.length} plans, ${seedReviews.length} reviews, ${seedFaqs.length} faqs`,
  )
})
