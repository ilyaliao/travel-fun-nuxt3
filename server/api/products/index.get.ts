import { and, asc, count, desc, eq, like, or, sql } from 'drizzle-orm'
import { plans, products } from '../../database/schema'
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category as string | undefined
  const city = query.city as string | undefined
  const q = query.q as string | undefined
  const sort = query.sort as string | undefined
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 12

  // Build WHERE conditions
  const conditions = [eq(products.isEnabled, 1)]
  if (category)
    conditions.push(eq(products.category, category))
  if (city)
    conditions.push(eq(products.city, city))
  if (q) {
    conditions.push(or(like(products.title, `%${q}%`), like(products.city, `%${q}%`))!)
  }
  const where = and(...conditions)

  // Count
  const [{ total }] = await db.select({ total: count() }).from(products).where(where)
  const totalPages = Math.ceil(total / limit)

  // Sort
  let orderBy
  switch (sort) {
    case 'priceLowToHigh':
      orderBy = asc(products.price)
      break
    case 'userRating':
      orderBy = desc(products.evaluateNum)
      break
    case 'newArrivals':
      orderBy = desc(products.createdAt)
      break
    case 'popular':
    default:
      orderBy = sql`${products.evaluate} DESC, ${products.evaluateNum} DESC`
      break
  }

  // Query
  const rows = await db
    .select()
    .from(products)
    .where(where)
    .orderBy(orderBy)
    .limit(limit)
    .offset((page - 1) * limit)
    .all()

  // Attach plans
  const productIds = rows.map(r => r.id)
  const allPlans = productIds.length
    ? await db
        .select()
        .from(plans)
        .where(
          sql`${plans.productId} IN (${sql.join(
            productIds.map(id => sql`${id}`),
            sql`, `,
          )})`,
        )
        .all()
    : []

  const plansByProductId = new Map<string, typeof allPlans>()
  for (const plan of allPlans) {
    const list = plansByProductId.get(plan.productId) || []
    list.push(plan)
    plansByProductId.set(plan.productId, list)
  }

  const result = rows.map(p => ({
    ...p,
    is_enabled: !!p.isEnabled,
    origin_price: p.originPrice,
    imageUrl: p.imageUrl,
    imagesUrl: p.imagesUrl,
    evaluateNum: p.evaluateNum,
    plans: plansByProductId.get(p.id) || [],
  }))

  return {
    success: true,
    products: result,
    pagination: {
      total,
      current_page: page,
      total_pages: totalPages,
      has_pre: page > 1,
      has_next: page < totalPages,
    },
  }
})
