export const queryKeys = {
  products: {
    all: ['products', 'all'] as const,
    list: (category?: string) => ['products', 'list', category] as const,
    detail: (id: string) => ['products', 'detail', id] as const,
  },
  cart: {
    all: ['cart'] as const,
  },
  order: {
    detail: (id: string) => ['order', id] as const,
  },
}
