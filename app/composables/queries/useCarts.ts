import type { AddCartRes, CartRes, CouponRes, DeleteAllCartsRes, DeleteCartRes } from '~/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { queryKeys } from './keys'

export function useCartQuery() {
  const api = useApiClient()

  return useQuery({
    queryKey: queryKeys.cart.all,
    queryFn: () => api.get<CartRes>('cart'),
  })
}

export function useAddCart() {
  const api = useApiClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { data: { product_id: string, qty: number, buy_date: number } }) =>
      api.post<AddCartRes>('cart', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all })
    },
  })
}

export function useDeleteCart() {
  const api = useApiClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.delete<DeleteCartRes>(`cart/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all })
    },
  })
}

export function useDeleteAllCarts() {
  const api = useApiClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => api.delete<DeleteAllCartsRes>('carts'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all })
    },
  })
}

export function useApplyCoupon() {
  const api = useApiClient()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (code: string) => api.post<CouponRes>('coupon', { data: { code } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all })
    },
  })
}
