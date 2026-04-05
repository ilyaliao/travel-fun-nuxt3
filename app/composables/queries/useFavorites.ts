import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useLocalStorage } from '@vueuse/core'
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

interface GuestFavoriteItem {
  productId: string
  addedAt: number
}

const GUEST_FAVORITES_KEY = 'guest-favorites'

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
      $fetch<FavoritesRes>('/api/favorites', { method: 'POST', body: { product_id: productId } }),
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.all })
      const snapshot = queryClient.getQueryData<FavoritesRes>(queryKeys.favorites.all)
      queryClient.setQueryData<FavoritesRes>(queryKeys.favorites.all, (old) => {
        const optimistic: FavoriteItem = { id: -Date.now(), product_id: productId }
        return {
          success: true,
          data: [...(old?.data ?? []), optimistic],
        }
      })
      return { snapshot }
    },
    onError: (_err, _vars, context) => {
      if (context?.snapshot)
        queryClient.setQueryData(queryKeys.favorites.all, context.snapshot)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all })
    },
  })
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => $fetch(`/api/favorites/${id}`, { method: 'DELETE' }),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.favorites.all })
      const snapshot = queryClient.getQueryData<FavoritesRes>(queryKeys.favorites.all)
      queryClient.setQueryData<FavoritesRes>(queryKeys.favorites.all, old => ({
        success: true,
        data: (old?.data ?? []).filter(f => f.id !== id),
      }))
      return { snapshot }
    },
    onError: (_err, _vars, context) => {
      if (context?.snapshot)
        queryClient.setQueryData(queryKeys.favorites.all, context.snapshot)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all })
    },
  })
}

function useGuestFavorites() {
  const stored = useLocalStorage<GuestFavoriteItem[]>(GUEST_FAVORITES_KEY, [])

  const guestFavoriteIds = computed(() => new Set(stored.value.map(f => f.productId)))

  function checkGuest(productId: string) {
    return guestFavoriteIds.value.has(productId)
  }

  function toggleGuest(productId: string, title: string) {
    if (checkGuest(productId)) {
      stored.value = stored.value.filter(f => f.productId !== productId)
      toast.success(`成功將 ${title} 移出收藏`)
    }
    else {
      stored.value = [...stored.value, { productId, addedAt: Date.now() }]
      toast.success(`成功將 ${title} 加入收藏`)
    }
  }

  return { stored, guestFavoriteIds, checkGuest, toggleGuest }
}

export function useFavoriteHelpers() {
  const { loggedIn } = useUserSession()
  const { data } = useFavoritesQuery()
  const addMutation = useAddFavorite()
  const removeMutation = useRemoveFavorite()
  const { stored: guestStored, guestFavoriteIds, toggleGuest } = useGuestFavorites()

  const favoriteIds = computed(() =>
    loggedIn.value
      ? new Set(data.value?.data?.map(f => f.product_id) ?? [])
      : guestFavoriteIds.value,
  )

  function checkFavorite(productId: string) {
    return favoriteIds.value.has(productId)
  }

  function findFavoriteId(productId: string) {
    return data.value?.data?.find(f => f.product_id === productId)?.id
  }

  function toggleFavorite(productId: string, title: string) {
    if (!loggedIn.value) {
      toggleGuest(productId, title)
      return
    }

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

  return { checkFavorite, toggleFavorite, favoriteIds, data, guestStored }
}

export function useFavoriteSyncOnLogin() {
  const { loggedIn } = useUserSession()
  const queryClient = useQueryClient()
  const guestStored = useLocalStorage<GuestFavoriteItem[]>(GUEST_FAVORITES_KEY, [])

  watch(loggedIn, async (isLoggedIn, wasLoggedIn) => {
    if (!isLoggedIn || wasLoggedIn)
      return
    if (guestStored.value.length === 0)
      return

    const currentFavorites = await $fetch<FavoritesRes>('/api/favorites')
    const existingIds = new Set(currentFavorites?.data?.map(f => f.product_id) || [])

    const toSync = guestStored.value.filter(g => !existingIds.has(g.productId))
    if (toSync.length === 0) {
      guestStored.value = []
      return
    }

    const results = await Promise.allSettled(
      toSync.map(g =>
        $fetch('/api/favorites', { method: 'POST', body: { product_id: g.productId } }),
      ),
    )

    const syncedIds = new Set<string>()
    results.forEach((result, index) => {
      if (result.status === 'fulfilled')
        syncedIds.add(toSync[index].productId)
    })

    guestStored.value = guestStored.value.filter(g => !syncedIds.has(g.productId))

    await queryClient.invalidateQueries({ queryKey: queryKeys.favorites.all })

    if (syncedIds.size > 0)
      toast.success(`已同步 ${syncedIds.size} 件收藏`)
  })
}
