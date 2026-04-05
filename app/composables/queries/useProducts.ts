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

export interface UseProductsParams {
  city?: string
  category?: string
  q?: string
  sort?: string
  page?: number
  limit?: number
}

export function useProducts(params: MaybeRef<UseProductsParams>) {
  const resolved = computed(() => toValue(params))

  return useQuery({
    queryKey: computed(() => queryKeys.products.list({ ...resolved.value })),
    queryFn: () => {
      const p = resolved.value
      const searchParams = new URLSearchParams()
      if (p.city)
        searchParams.set('city', p.city)
      if (p.category)
        searchParams.set('category', p.category)
      if (p.q)
        searchParams.set('q', p.q)
      if (p.sort)
        searchParams.set('sort', p.sort)
      if (p.page)
        searchParams.set('page', String(p.page))
      if (p.limit)
        searchParams.set('limit', String(p.limit))
      const qs = searchParams.toString()
      return $fetch<ProductListRes>(`/api/products${qs ? `?${qs}` : ''}`)
    },
  })
}

export function useProduct(id: MaybeRef<string>) {
  return useQuery({
    queryKey: computed(() => queryKeys.products.detail(toValue(id))),
    queryFn: () => $fetch<ProductDetailRes>(`/api/products/${toValue(id)}`),
    enabled: computed(() => !!toValue(id)),
  })
}
