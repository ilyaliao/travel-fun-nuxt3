import type { Order } from '~/types'
import { useMutation, useQuery } from '@pinia/colada'

interface AddOrderRes {
  create_at: number
  orderId: string
  total: number
}

interface OrderDetailRes {
  order: Order
}

export function useOrderQuery(id: MaybeRef<string>) {
  const api = useApiClient()

  return useQuery({
    key: () => ['order', toValue(id)],
    query: () => api.get<OrderDetailRes>(`order/${toValue(id)}`),
    enabled: () => !!toValue(id),
  })
}

export function useAddOrder() {
  const api = useApiClient()

  return useMutation({
    mutation: (data: { data: Order }) => api.post<AddOrderRes>('order', data),
  })
}

export function usePayOrder() {
  const api = useApiClient()

  return useMutation({
    mutation: (id: string) => api.post(`pay/${id}`),
  })
}
