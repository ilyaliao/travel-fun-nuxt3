<script setup lang="ts">
const { stored } = useFavoriteHelpers()
const { data: allProductsData, isLoading } = useAllProducts()

const sortBy = ref('newest')
const sortOptions = [
  { label: '最新加入', value: 'newest' },
  { label: '最早加入', value: 'oldest' },
  { label: '價格低到高', value: 'price-asc' },
  { label: '價格高到低', value: 'price-desc' },
]

const wishlistProducts = computed(() => {
  const allProducts = allProductsData.value?.products || []
  const ids = new Set(stored.value.map(g => g.productId))
  const addedAtMap = new Map(stored.value.map(g => [g.productId, g.addedAt]))

  const products = allProducts
    .filter(p => ids.has(p.id))
    .map(p => ({ ...p, _addedAt: addedAtMap.get(p.id) || 0 }))

  return [...products].sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return a._addedAt - b._addedAt
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'newest':
      default:
        return b._addedAt - a._addedAt
    }
  })
})

const hasStoredFavorites = computed(() => stored.value.length > 0)

useSeoMeta({ title: '收藏清單' })
</script>

<template>
  <div class="mx-auto px-4 py-8 max-w-[1296px]">
    <UiBreadcrumb class="mb-6">
      <UiBreadcrumbItem>
        <NuxtLink to="/" class="hover:text-cc-primary">
          首頁
        </NuxtLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <span class="text-cc-black">收藏清單</span>
      </UiBreadcrumbItem>
    </UiBreadcrumb>

    <h1 class="text-h3 mb-1">
      收藏清單
    </h1>
    <p class="text-sm text-cc-grey-9f mb-6">
      你的旅行口袋名單
    </p>

    <template v-if="isLoading && hasStoredFavorites">
      <div class="mb-4 flex items-center justify-between">
        <div class="rounded bg-cc-grey-e9 h-5 w-20 animate-pulse" />
        <div class="rounded bg-cc-grey-e9 h-10 w-36 animate-pulse" />
      </div>
      <div
        class="gap-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5"
      >
        <div v-for="i in 3" :key="i" class="rounded-2xl bg-white shadow-sm overflow-hidden">
          <div class="bg-cc-grey-e9 aspect-4/3 animate-pulse" />
          <div class="p-4 space-y-2">
            <div class="rounded bg-cc-grey-e9 h-4 w-3/4 animate-pulse" />
            <div class="rounded bg-cc-grey-e9 h-3 w-1/2 animate-pulse" />
            <div class="rounded bg-cc-grey-e9 h-5 w-1/3 animate-pulse" />
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="wishlistProducts.length">
      <div class="mb-4 flex flex-wrap gap-2 items-center justify-between">
        <span class="text-sm text-cc-grey-9f">共 {{ wishlistProducts.length }} 件收藏</span>
        <label class="sr-only" for="wishlist-sort">排序方式</label>
        <UiSelect
          id="wishlist-sort"
          v-model="sortBy"
          :options="sortOptions"
          class="min-w-36 w-auto"
        />
      </div>

      <div
        class="gap-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-5"
      >
        <HomeProductCard
          v-for="product in wishlistProducts"
          :key="product.id"
          :product
          not-ranking
        />
      </div>
    </template>

    <div v-else class="py-16 flex flex-col items-center justify-center">
      <div class="i-material-symbols-favorite-outline text-cc-grey-d4 mb-4 h-16 w-16" />
      <p class="text-body text-cc-grey-9f mb-2">
        還沒有收藏的商品
      </p>
      <p class="text-sm text-cc-grey-9f mb-6">
        點擊商品右上角的 ♥ 即可收藏
      </p>
      <NuxtLink
        to="/products"
        class="text-sm text-white px-6 py-2.5 rounded-full bg-cc-primary transition-colors hover:bg-cc-primary/90"
      >
        探索熱門景點
      </NuxtLink>
    </div>
  </div>
</template>
