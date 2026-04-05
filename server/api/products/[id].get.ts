import { asc, desc, eq } from 'drizzle-orm'
import { faqs, plans, products, reviews } from '../../database/schema'
import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!

  const product = await db.select().from(products).where(eq(products.id, id)).get()
  if (!product) {
    throw createError({ statusCode: 404, message: '找不到此商品' })
  }

  const [productPlans, productReviews, productFaqs] = await Promise.all([
    db.select().from(plans).where(eq(plans.productId, id)).all(),
    db
      .select()
      .from(reviews)
      .where(eq(reviews.productId, id))
      .orderBy(desc(reviews.createdAt))
      .all(),
    db.select().from(faqs).where(eq(faqs.productId, id)).orderBy(asc(faqs.sortOrder)).all(),
  ])

  return {
    success: true,
    product: { ...product, plans: productPlans },
    reviews: productReviews,
    faqs: productFaqs,
  }
})
