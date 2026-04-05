import type { Cart, Faq, Order, Pagination, Product, Review } from './data'

export interface BaseApiResponse {
  success: boolean
  message: string
}

// === Products ===

export interface AllProductRes extends BaseApiResponse {
  products: Product[]
}

export interface ProductListRes extends BaseApiResponse {
  pagination: Pagination
  products: Product[]
}

export interface ProductDetailRes extends BaseApiResponse {
  product: Product
  reviews: Review[]
  faqs: Faq[]
}

// === Cart ===

export interface CartRes extends BaseApiResponse {
  data: {
    carts: Cart[]
    final_total: number
    total: number
  }
}

export interface AddCartRes extends BaseApiResponse {}

export interface DeleteCartRes extends BaseApiResponse {}

export interface DeleteAllCartsRes extends BaseApiResponse {}

// === Coupon ===

export interface CouponRes extends BaseApiResponse {
  data: {
    final_total: number
  }
}

// === Order ===

export interface OrderDetailRes extends BaseApiResponse {
  order: Order
}

export interface AddOrderRes extends BaseApiResponse {
  create_at: number
  orderId: string
  total: number
}

export interface PayOrderRes extends BaseApiResponse {}

// === Auth ===

export interface AuthRes extends BaseApiResponse {}

export interface LogoutRes extends BaseApiResponse {}
