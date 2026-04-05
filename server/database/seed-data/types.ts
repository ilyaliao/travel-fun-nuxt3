export interface ProductDefinition {
  slug: string
  title: string
  description: string
  content: string
  price: number
  originPrice: number
  address: string
  category: 'tickets' | 'package'
  coordinates: { lat: number, lng: number }
  imagePool: string
  features: string
  transport: string
  evaluate: number
  evaluateNum: number
  customPlans?: Array<{
    title: string
    priceFactor: number
    description: string
    includes: string[]
    duration: string
    applicableTo: string
    cancellationPolicy?: string
  }>
  customFaqs?: Array<{
    question: string
    answer: string
  }>
}

export interface SeedProduct {
  id: string
  title: string
  description: string
  content: string
  price: number
  originPrice: number
  imageUrl: string
  imagesUrl: string[]
  address: string
  city: string
  category: string
  coordinates: { lat: number, lng: number }
  evaluate: number
  evaluateNum: number
  unit: string
  features: string
  usage: string
  isEnabled: number
}

export interface SeedPlan {
  productId: string
  title: string
  price: number
  description: string
  includes: string[]
  duration: string
  applicableTo: string
  cancellationPolicy: string
}

export interface SeedReview {
  productId: string
  userName: string
  rating: number
  comment: string
  createdAt: number
}

export interface SeedFaq {
  productId: string
  question: string
  answer: string
  sortOrder: number
}
