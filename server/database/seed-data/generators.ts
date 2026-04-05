import type { ProductDefinition, SeedFaq, SeedPlan, SeedProduct, SeedReview } from './types'
import { IMAGE_POOLS } from './images'

// ---------- Deterministic hash ----------
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function pickFromPool<T>(pool: T[], seed: number, count: number): T[] {
  const result: T[] = []
  const len = pool.length
  for (let i = 0; i < count; i++) {
    result.push(pool[(seed + i * 7) % len]!)
  }
  return result
}

// ---------- Image resolution ----------
function resolveImages(
  productId: string,
  poolKey: string,
): { imageUrl: string, imagesUrl: string[] } {
  const pool = IMAGE_POOLS[poolKey] || IMAGE_POOLS.nature || []
  if (pool.length === 0) {
    return { imageUrl: '', imagesUrl: [] }
  }
  const seed = hashCode(productId)
  const picked = pickFromPool(pool, seed, 3)
  return { imageUrl: picked[0]!, imagesUrl: picked.slice(1) }
}

// ---------- Usage HTML ----------
function generateUsage(category: string, transport: string): string {
  const steps
    = category === 'tickets'
      ? ['購買後將收到電子憑證 QR Code', '前往入口處出示 QR Code 兌換票券', '兌換後即可入場參觀']
      : [
          '購買後將收到電子憑證與行程確認信',
          '於集合地點出示憑證給導遊確認',
          '跟隨導覽員依行程出發',
        ]
  return `<h4>如何使用</h4><ol>${steps.map(s => `<li>${s}</li>`).join('')}</ol><h4>如何前往</h4><p>${transport}</p>`
}

// ---------- Build full product ----------
export function buildFullProduct(city: string, def: ProductDefinition): SeedProduct {
  const id = `seed-${city}-${def.slug}`
  const { imageUrl, imagesUrl } = resolveImages(id, def.imagePool)
  return {
    id,
    title: def.title,
    description: def.description,
    content: def.content,
    price: def.price,
    originPrice: def.originPrice,
    imageUrl,
    imagesUrl,
    address: def.address,
    city,
    category: def.category,
    coordinates: def.coordinates,
    evaluate: def.evaluate,
    evaluateNum: def.evaluateNum,
    unit: def.category === 'tickets' ? '張' : '人',
    features: def.features,
    usage: generateUsage(def.category, def.transport),
    isEnabled: 1,
  }
}

// ---------- Plan generation ----------
const TICKET_PLANS = [
  {
    title: '成人票',
    priceFactor: 1.0,
    description: '一般成人入場',
    applicableTo: '成人',
    includes: ['入場門票', '基本導覽'],
    duration: '1-2小時',
  },
  {
    title: '優待票',
    priceFactor: 0.7,
    description: '學生、65歲以上長者適用',
    applicableTo: '學生/長者',
    includes: ['入場門票'],
    duration: '1-2小時',
  },
  {
    title: '親子套票',
    priceFactor: 1.6,
    description: '一大一小同行優惠',
    applicableTo: '一大一小',
    includes: ['入場門票x2', '兒童導覽手冊'],
    duration: '1-2小時',
  },
]

const PACKAGE_PLANS = [
  {
    title: '標準方案',
    priceFactor: 1.0,
    description: '基本行程體驗',
    applicableTo: '所有年齡',
    includes: ['專業導覽', '保險', '飲用水'],
    duration: '半日',
  },
  {
    title: '豪華方案',
    priceFactor: 1.5,
    description: '含餐食與精選伴手禮',
    applicableTo: '所有年齡',
    includes: ['專業導覽', '保險', '在地午餐', '伴手禮'],
    duration: '全日',
  },
]

export function generatePlans(city: string, def: ProductDefinition): SeedPlan[] {
  const productId = `seed-${city}-${def.slug}`

  if (def.customPlans) {
    return def.customPlans.map(p => ({
      productId,
      title: p.title,
      price: Math.round(def.price * p.priceFactor),
      description: p.description,
      includes: p.includes,
      duration: p.duration,
      applicableTo: p.applicableTo,
      cancellationPolicy: p.cancellationPolicy || '24小時前免費取消',
    }))
  }

  const templates = def.category === 'tickets' ? TICKET_PLANS : PACKAGE_PLANS
  return templates.map(t => ({
    productId,
    title: t.title,
    price: Math.round(def.price * t.priceFactor),
    description: t.description,
    includes: t.includes,
    duration: t.duration,
    applicableTo: t.applicableTo,
    cancellationPolicy: '24小時前免費取消',
  }))
}

// ---------- Review generation ----------
const REVIEWER_NAMES = [
  '陳小明',
  '林美玲',
  '王大偉',
  '張雅婷',
  '李志豪',
  '黃佳琪',
  '吳宗翰',
  '劉怡君',
  '蔡承恩',
  '許雅如',
  '楊宏偉',
  'Emily Chen',
  'David Lin',
  '鄭淑芬',
  '周建宏',
  '趙家豪',
  '謝佩珊',
  'Jason Wang',
  '田中太郎',
  '金秀英',
  '洪雅文',
  '曾國華',
  '郭美華',
  'Sarah Lee',
  '高志明',
  '朱俊傑',
  '沈怡伶',
  'Michael Huang',
  '呂淑惠',
  '范文彬',
]

const REVIEW_TEMPLATES_5 = [
  '超棒的體驗！{feature}讓人印象深刻，非常推薦！',
  '帶家人來玩大家都很開心，{feature}是最大亮點。下次還會再來！',
  '很值得！環境很好，{feature}超有趣。推薦給朋友了！',
  '五星好評！從訂票到體驗都很順暢，{feature}太讚了。',
  '第二次來了還是覺得很棒！{feature}每次來都有不同感受。',
  '{title}真的太值得了！CP值超高，{feature}令人驚豔。',
  '假期最棒的安排！{feature}讓小朋友玩到不想回家。',
]

const REVIEW_TEMPLATES_4 = [
  '整體不錯，{feature}是亮點。假日人比較多，建議平日前往。',
  '體驗很好，不過排隊等了一下。{feature}蠻值得的。',
  '環境維護得不錯，{feature}很有特色。價格稍貴但可接受。',
  '蠻推薦的，{feature}很棒。交通稍不方便但值得一遊。',
  '整體滿意，{feature}超出預期。只是指標可以再清楚一點。',
]

const REVIEW_TEMPLATES_3 = [
  '還可以，{feature}不錯，但覺得票價稍高。',
  '普通，{feature}還行，期待值太高有點落差。',
]

export function generateReviews(city: string, def: ProductDefinition): SeedReview[] {
  const productId = `seed-${city}-${def.slug}`
  const seed = hashCode(productId)
  const count = 5 + (seed % 4) // 5-8 reviews
  const features = def.features.split(',')
  const baseTime = 1740000000 // 2025-02-20 approx

  const reviews: SeedReview[] = []
  for (let i = 0; i < count; i++) {
    const idx = (seed + i * 13) % REVIEWER_NAMES.length
    const feature = features[(seed + i * 3) % features.length]!

    let rating: number
    let templates: string[]
    const ratingRoll = (seed + i * 17) % 10
    if (ratingRoll < 5) {
      rating = 5
      templates = REVIEW_TEMPLATES_5
    }
    else if (ratingRoll < 8) {
      rating = 4
      templates = REVIEW_TEMPLATES_4
    }
    else {
      rating = 3
      templates = REVIEW_TEMPLATES_3
    }

    const tplIdx = (seed + i * 11) % templates.length
    const comment = templates[tplIdx]!.replace('{feature}', feature.trim()).replace(
      '{title}',
      def.title,
    )

    reviews.push({
      productId,
      userName: REVIEWER_NAMES[idx]!,
      rating,
      comment,
      createdAt: baseTime + i * 86400 * 3 + (seed % 86400),
    })
  }
  return reviews
}

// ---------- FAQ generation ----------
const FAQ_TEMPLATES_TICKETS = [
  {
    question: '開放時間是什麼時候？',
    answer: '請至官方網站確認最新開放時間。電子票券購買後 30 天內有效，可任選一天使用。',
  },
  {
    question: '電子票券如何使用？',
    answer: '購買後會收到 QR Code 電子憑證，前往現場出示 QR Code 即可兌換入場。',
  },
  {
    question: '可以退票嗎？',
    answer: '使用日 24 小時前可免費取消並全額退款。逾期或已使用恕不退票。',
  },
  { question: '有停車場嗎？', answer: '設有停車場，假日容易客滿，建議搭乘大眾運輸工具前往。' },
]

const FAQ_TEMPLATES_PACKAGE = [
  {
    question: '集合地點在哪裡？',
    answer: '購買後將以 Email 寄送詳細集合地點與時間，請於出發前 15 分鐘到達。',
  },
  {
    question: '可以退費嗎？',
    answer: '出發日 24 小時前可免費取消並全額退款，24 小時內取消收取 50% 費用。',
  },
  {
    question: '需要自備什麼裝備？',
    answer: '建議穿著舒適鞋子，攜帶防曬用品與水。其餘所需用品行程均會提供。',
  },
  {
    question: '小朋友可以參加嗎？',
    answer: '歡迎所有年齡參加，12歲以下兒童需由成人陪同。部分活動有年齡/身高限制，請參考方案說明。',
  },
]

export function generateFaqs(city: string, def: ProductDefinition): SeedFaq[] {
  const productId = `seed-${city}-${def.slug}`

  if (def.customFaqs) {
    return def.customFaqs.map((f, i) => ({
      productId,
      question: f.question,
      answer: f.answer,
      sortOrder: i + 1,
    }))
  }

  const templates = def.category === 'tickets' ? FAQ_TEMPLATES_TICKETS : FAQ_TEMPLATES_PACKAGE
  return templates.map((t, i) => ({
    productId,
    question: t.question,
    answer: t.answer,
    sortOrder: i + 1,
  }))
}
