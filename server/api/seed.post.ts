import { coupons, plans, products, users } from '../database/schema'
import { db } from '../utils/db'

export default defineEventHandler(async () => {
  if (!import.meta.dev) {
    throw createError({ statusCode: 403, message: 'Seed only available in dev' })
  }

  const config = useRuntimeConfig()
  const apiBase = config.apiBase
  const apiSecret = config.apiSecret

  if (!apiBase || !apiSecret) {
    throw createError({
      statusCode: 500,
      message: 'Missing apiBase or apiSecret in runtimeConfig (server-only)',
    })
  }

  const res = await $fetch<{ success: boolean, products: any[] }>(
    `${apiBase}/api/${apiSecret}/products/all`,
  )

  if (!res.success || !res.products?.length) {
    throw createError({ statusCode: 500, message: 'Failed to fetch products from Hexschool API' })
  }

  let productCount = 0
  let planCount = 0

  for (const p of res.products) {
    await db
      .insert(products)
      .values({
        id: p.id,
        title: p.title,
        description: p.description,
        content: p.content,
        price: p.price,
        originPrice: p.origin_price,
        imageUrl: p.imageUrl,
        imagesUrl: p.imagesUrl || [],
        address: p.address,
        city: p.city,
        category: p.category,
        coordinates: p.coordinates,
        evaluate: p.evaluate,
        evaluateNum: p.evaluateNum,
        unit: p.unit,
        features: p.features,
        isEnabled: p.is_enabled ? 1 : 0,
        createdAt: p.date || Math.floor(Date.now() / 1000),
      })
      .onConflictDoNothing()

    productCount++

    if (p.plans?.length) {
      for (const plan of p.plans) {
        await db.insert(plans).values({
          productId: p.id,
          title: plan.title,
          price: plan.price,
          description: plan.content,
        })
        planCount++
      }
    }
  }

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

  return {
    success: true,
    message: `Seed 完成：${productCount} 產品, ${planCount} 方案, 1 admin, 2 coupons`,
  }
})
