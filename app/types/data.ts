// 產品
export interface Product {
  address: string
  category: string
  city: string
  content?: string
  coordinates: Coordinates
  date: number
  description?: string
  evaluate: number
  evaluateNum: number
  features?: string
  id: string
  imageUrl: string
  imagesUrl?: string[]
  is_enabled: boolean
  origin_price: number
  plans?: Plan[]
  price: number
  title: string
  unit: string
}

// 座標
export interface Coordinates {
  lat: number
  lng: number
}

// 購物車
export interface Cart {
  buy_date: number
  coupon_code?: string
  final_total?: number
  id?: string
  product?: Product
  product_id: string
  qty: number
  total?: number
}

// 訂單
export interface User {
  address: string
  email: string
  name: string
  tel: string
}

export interface Order {
  create_at?: number
  id?: string
  is_paid?: boolean
  message: string
  num?: number
  products?: Record<
    string,
    {
      buy_date: number
      final_total: number
      id: string
      product: Product
      product_id: string
      qty: number
      total: number
    }
  >
  total?: number
  user: User
}

// 優惠卷
export interface Coupon {
  code: string
  due_date: number
  id: string
  is_enabled: number
  num: number
  percent: number
  title: string
}

// 新聞
export interface New {
  description: string
  image: string
  title: string
}

export interface City {
  enName: string
  image: string
  name: string
}

export interface Plan {
  content: string
  origin_price: number
  price: number
  title: string
}

export enum Sort {
  NewArrivals = 'newArrivals',
  Popular = 'popular',
  PriceLowToHigh = 'priceLowToHigh',
  UserRating = 'userRating',
}
