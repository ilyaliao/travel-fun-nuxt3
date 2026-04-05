import { useLocalStorage } from '@vueuse/core'
import { toast } from 'vue-sonner'

interface FavoriteItem {
  productId: string
  addedAt: number
}

const FAVORITES_KEY = 'favorites'

export function useFavoriteHelpers() {
  const stored = useLocalStorage<FavoriteItem[]>(FAVORITES_KEY, [])

  const favoriteIds = computed(() => new Set(stored.value.map(f => f.productId)))

  function checkFavorite(productId: string) {
    return favoriteIds.value.has(productId)
  }

  function toggleFavorite(productId: string) {
    if (checkFavorite(productId)) {
      const removed = stored.value.find(f => f.productId === productId)
      stored.value = stored.value.filter(f => f.productId !== productId)
      toast.success('已移出收藏', {
        action: removed
          ? {
              label: '復原',
              onClick: () => {
                stored.value = [...stored.value, removed]
              },
            }
          : undefined,
      })
    }
    else {
      stored.value = [...stored.value, { productId, addedAt: Date.now() }]
      toast.success('已加入收藏')
    }
  }

  return { checkFavorite, toggleFavorite, favoriteIds, stored }
}
