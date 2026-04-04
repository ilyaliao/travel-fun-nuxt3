import type { AddOrderRes, Order, OrderDetailRes, PayOrderRes } from '~/types'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { queryKeys } from './keys'

export function useOrderQuery(id: MaybeRef<string>) {
  return useQuery({
    queryKey: computed(() => queryKeys.order.detail(toValue(id))),
    queryFn: () => $fetch<OrderDetailRes>(`/api/orders/${toValue(id)}`),
    enabled: computed(() => !!toValue(id)),
  })
}

export function useAddOrder() {
  return useMutation({
    mutationFn: (data: { data: Order }) =>
      $fetch<AddOrderRes>('/api/orders', { method: 'POST', body: data }),
  })
}

export function usePayOrder() {
  return useMutation({
    mutationFn: (id: string) => $fetch<PayOrderRes>(`/api/orders/${id}/pay`, { method: 'POST' }),
  })
}
