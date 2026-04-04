import type { MaybeRef } from 'vue'
import type { Pagination, Product } from '~/types'
import { useQuery } from '@pinia/colada'

interface AllProductRes {
  products: Product[]
}

interface ProductListRes {
  pagination: Pagination
  products: Product[]
}

interface ProductDetailRes {
  product: Product
}

export function useAllProducts() {
  const api = useApiClient()

  return useQuery({
    key: ['products', 'all'],
    query: () => api.get<AllProductRes>('products/all'),
  })
}

export function useProducts(category?: MaybeRef<string>) {
  const api = useApiClient()
  const categoryVal = toValue(category)

  return useQuery({
    key: () => ['products', 'list', categoryVal],
    query: () =>
      api.get<ProductListRes>(`products${categoryVal ? `?category=${categoryVal}` : ''}`),
  })
}

export function useProduct(id: MaybeRef<string>) {
  const api = useApiClient()

  return useQuery({
    key: () => ['products', 'detail', toValue(id)],
    query: () => api.get<ProductDetailRes>(`product/${toValue(id)}`),
    enabled: () => !!toValue(id),
  })
}
