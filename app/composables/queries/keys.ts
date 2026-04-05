export const queryKeys = {
  products: {
    all: ['products', 'all'] as const,
    list: (params?: Record<string, string | number | undefined>) =>
      ['products', 'list', params] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
  },
  cart: {
    all: ['cart'] as const,
  },
  order: {
    detail: (id: string) => ['order', id] as const,
  },
  favorites: {
    all: ['favorites'] as const,
  },
}
