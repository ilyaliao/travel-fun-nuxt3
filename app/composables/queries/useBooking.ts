import type { AddOrderRes, Order, OrderDetailRes, PayOrderRes } from '~/types'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { queryKeys } from './keys'

export function useOrderQuery(id: MaybeRef<string>) {
  const api = useApiClient()

  return useQuery({
    queryKey: computed(() => queryKeys.order.detail(toValue(id))),
    queryFn: () => api.get<OrderDetailRes>(`order/${toValue(id)}`),
    enabled: computed(() => !!toValue(id)),
  })
}

export function useAddOrder() {
  const api = useApiClient()

  return useMutation({
    mutationFn: (data: { data: Order }) => api.post<AddOrderRes>('order', data),
  })
}

export function usePayOrder() {
  const api = useApiClient()

  return useMutation({
    mutationFn: (id: string) => api.post<PayOrderRes>(`pay/${id}`),
  })
}
