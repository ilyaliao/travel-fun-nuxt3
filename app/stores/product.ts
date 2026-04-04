import type { Product } from '~/types'
import { Sort } from '~/types'

type SortFunction = (a: Product, b: Product) => number

export const useProductStore = defineStore('product', () => {
  const sortByNewest: SortFunction = (a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  const sortByPopular: SortFunction = (a, b) =>
    b.evaluate - a.evaluate || b.evaluateNum - a.evaluateNum
  const sortByReviewCount: SortFunction = (a, b) => b.evaluateNum - a.evaluateNum
  const sortByPrice: SortFunction = (a, b) => a.price - b.price

  function getSortData(products: Product[], sortType: Sort) {
    const sorted = [...products]
    switch (sortType) {
      case Sort.Popular:
        return sorted.sort(sortByPopular)
      case Sort.UserRating:
        return sorted.sort(sortByReviewCount)
      case Sort.PriceLowToHigh:
        return sorted.sort(sortByPrice)
      case Sort.NewArrivals:
        return sorted.sort(sortByNewest)
      default:
        return sorted
    }
  }

  function getFilterData(array: Product[], city: string | null = '', category = '', num = 10) {
    let filtered = array ? [...array] : []

    if (city)
      filtered = filtered.filter(item => item.city === city)

    if (category)
      filtered = filtered.filter(item => item.category === category)

    return num === 0 ? filtered : filtered.slice(0, num)
  }

  return {
    getSortData,
    getFilterData,
  }
})
