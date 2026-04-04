import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { queryKeys } from './keys'

interface FavoriteItem {
  id: number
  product_id: string
  product?: any
}

interface FavoritesRes {
  success: boolean
  data: FavoriteItem[]
}

export function useFavoritesQuery() {
  const { loggedIn } = useUserSession()

  return useQuery({
    queryKey: queryKeys.favorites.all,
    queryFn: () => $fetch<FavoritesRes>('/api/favorites'),
    enabled: loggedIn,
  })
}

export function useAddFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) =>
      $fetch('/api/favorites', { method: 'POST', body: { product_id: productId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all })
    },
  })
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => $fetch(`/api/favorites/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all })
    },
  })
}

export function useFavoriteHelpers() {
  const { data } = useFavoritesQuery()
  const addMutation = useAddFavorite()
  const removeMutation = useRemoveFavorite()

  const favoriteIds = computed(() => new Set(data.value?.data?.map(f => f.product_id) || []))

  function checkFavorite(productId: string) {
    return favoriteIds.value.has(productId)
  }

  function findFavoriteId(productId: string) {
    return data.value?.data?.find(f => f.product_id === productId)?.id
  }

  function toggleFavorite(productId: string, title: string) {
    if (checkFavorite(productId)) {
      const favId = findFavoriteId(productId)
      if (favId) {
        removeMutation.mutate(favId, {
          onSuccess: () => toast.success(`成功將 ${title} 移出收藏`),
        })
      }
    }
    else {
      addMutation.mutate(productId, {
        onSuccess: () => toast.success(`成功將 ${title} 加入收藏`),
      })
    }
  }

  return { checkFavorite, toggleFavorite, favoriteIds, data }
}
