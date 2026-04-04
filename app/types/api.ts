import type { Cart, Order, Pagination, Product } from './data'

// 六角學院 API 共用回應格式
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

export interface SigninRes extends BaseApiResponse {
  expired: number
  token: string
  uid: string
}

export interface LogoutRes extends BaseApiResponse {}
