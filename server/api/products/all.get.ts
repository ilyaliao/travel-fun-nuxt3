import { eq } from 'drizzle-orm'
import { plans, products } from '../../database/schema'
import { db } from '../../utils/db'

export default defineEventHandler(async () => {
  const allProducts = await db.select().from(products).where(eq(products.isEnabled, 1)).all()
  const allPlans = await db.select().from(plans).all()

  const plansByProductId = new Map<string, typeof allPlans>()
  for (const plan of allPlans) {
    const list = plansByProductId.get(plan.productId) || []
    list.push(plan)
    plansByProductId.set(plan.productId, list)
  }

  const result = allProducts.map(p => ({
    ...p,
    is_enabled: !!p.isEnabled,
    origin_price: p.originPrice,
    imageUrl: p.imageUrl,
    imagesUrl: p.imagesUrl,
    evaluateNum: p.evaluateNum,
    plans: plansByProductId.get(p.id) || [],
  }))

  return { success: true, products: result }
})
