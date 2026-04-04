import type { Cart } from '~/types'
import { useMutation, useQuery, useQueryCache } from '@pinia/colada'

interface CartRes {
  data: {
    carts: Cart[]
    final_total: number
    total: number
  }
}

interface CouponRes {
  data: {
    final_total: number
  }
}

export function useCartQuery() {
  const api = useApiClient()

  return useQuery({
    key: ['cart'],
    query: () => api.get<CartRes>('cart'),
  })
}

export function useAddCart() {
  const api = useApiClient()
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (data: { data: { product_id: string, qty: number, buy_date: number } }) =>
      api.post('cart', data),
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['cart'] })
    },
  })
}

export function useDeleteCart() {
  const api = useApiClient()
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (id: string) => api.delete(`cart/${id}`),
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['cart'] })
    },
  })
}

export function useDeleteAllCarts() {
  const api = useApiClient()
  const queryCache = useQueryCache()

  return useMutation({
    mutation: () => api.delete('carts'),
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['cart'] })
    },
  })
}

export function useApplyCoupon() {
  const api = useApiClient()
  const queryCache = useQueryCache()

  return useMutation({
    mutation: (code: string) => api.post<CouponRes>('coupon', { data: { code } }),
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['cart'] })
    },
  })
}
