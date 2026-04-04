import type { MaybeRef } from 'vue'
import type { AllProductRes, ProductDetailRes, ProductListRes } from '~/types'
import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from './keys'

export function useAllProducts() {
  const api = useApiClient()

  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: () => api.get<AllProductRes>('products/all'),
  })
}

export function useProducts(category?: MaybeRef<string>) {
  const api = useApiClient()
  const categoryVal = toValue(category)

  return useQuery({
    queryKey: queryKeys.products.list(categoryVal),
    queryFn: () =>
      api.get<ProductListRes>(`products${categoryVal ? `?category=${categoryVal}` : ''}`),
  })
}

export function useProduct(id: MaybeRef<string>) {
  const api = useApiClient()

  return useQuery({
    queryKey: computed(() => queryKeys.products.detail(toValue(id))),
    queryFn: () => api.get<ProductDetailRes>(`product/${toValue(id)}`),
    enabled: computed(() => !!toValue(id)),
  })
}
