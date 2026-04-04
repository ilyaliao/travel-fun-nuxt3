import { toast } from 'vue-sonner'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteList = useLocalStorage<string[]>('favorites', [])

  function addFavorite(id: string, title: string) {
    favoriteList.value.push(id)
    toast.success(`成功將 ${title} 加入收藏`)
  }

  function removeFavorite(id: string, title: string) {
    favoriteList.value = favoriteList.value.filter((curr: string) => curr !== id)
    toast.success(`成功將 ${title} 移出收藏`)
  }

  function checkFavorite(id: string) {
    return favoriteList.value.includes(id)
  }

  function removeLocalFavorites() {
    favoriteList.value = []
  }

  return {
    addFavorite,
    checkFavorite,
    favoriteList,
    removeFavorite,
    removeLocalFavorites,
  }
})
