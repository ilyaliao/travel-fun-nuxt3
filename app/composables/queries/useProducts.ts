import type { MaybeRef } from 'vue'
import type { AllProductRes, ProductDetailRes, ProductListRes } from '~/types'
import { useQuery } from '@tanstack/vue-query'
import { queryKeys } from './keys'

export function useAllProducts() {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: () => $fetch<AllProductRes>('/api/products/all'),
  })
}

export function useProducts(category?: MaybeRef<string>) {
  const categoryVal = toValue(category)

  return useQuery({
    queryKey: queryKeys.products.list(categoryVal),
    queryFn: () =>
      $fetch<ProductListRes>(`/api/products${categoryVal ? `?category=${categoryVal}` : ''}`),
  })
}

export function useProduct(id: MaybeRef<string>) {
  return useQuery({
    queryKey: computed(() => queryKeys.products.detail(toValue(id))),
    queryFn: () => $fetch<ProductDetailRes>(`/api/products/${toValue(id)}`),
    enabled: computed(() => !!toValue(id)),
  })
}
