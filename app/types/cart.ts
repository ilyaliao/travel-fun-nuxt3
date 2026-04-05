import type { Product } from './data'

export interface CartItem {
  id: string
  productId: string
  product: Product
  qty: number
  planTitle?: string
  planPrice?: number
  buyDate?: string // YYYY-MM-DD
}

export interface AppliedCoupon {
  code: string
  title: string
  type: 'percent' | 'fixed'
  value: number
  discountAmount: number
}

export type PaymentMethod = 'credit-card' | 'atm' | 'line-pay'

export interface Order {
  id: string
  items: CartItem[]
  coupon: AppliedCoupon | null
  user: {
    name: string
    email: string
    tel: string
    address: string
  }
  message: string
  subtotal: number
  discountAmount: number
  total: number
  paymentMethod: PaymentMethod
  isPaid: boolean
  createdAt: string
}
