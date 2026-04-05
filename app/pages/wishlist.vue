<script setup lang="ts">
const { loggedIn } = useUserSession()
const { data: favData } = useFavoritesQuery()
const { guestStored } = useFavoriteHelpers()
const { data: allProductsData } = useAllProducts()

const sortBy = ref('newest')
const sortOptions = [
  { label: '最新加入', value: 'newest' },
  { label: '最早加入', value: 'oldest' },
  { label: '價格低到高', value: 'price-asc' },
  { label: '價格高到低', value: 'price-desc' },
]

const wishlistProducts = computed(() => {
  let products: any[]

  if (loggedIn.value) {
    products
      = favData.value?.data
        ?.map(f => ({
          ...f.product,
          _addedAt: f.id,
        }))
        .filter(p => p?.id) || []
  }
  else {
    const allProducts = allProductsData.value?.data || []
    const guestIds = new Set(guestStored.value.map(g => g.productId))
    const guestAddedAtMap = new Map(guestStored.value.map(g => [g.productId, g.addedAt]))
    products = allProducts
      .filter(p => guestIds.has(p.id))
      .map(p => ({ ...p, _addedAt: guestAddedAtMap.get(p.id) || 0 }))
  }

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

    <h1 class="text-h3 mb-6">
      收藏清單
    </h1>

    <!-- Guest info banner -->
    <div
      v-if="!loggedIn && wishlistProducts.length"
      class="text-sm text-cc-grey-9f mb-4 px-4 py-3 border border-cc-grey-d4 rounded-lg flex gap-2 items-center"
    >
      <div class="i-material-symbols-info-outline shrink-0 h-5 w-5" />
      <span>登入後收藏會自動同步到你的帳號。
        <NuxtLink to="/login" class="text-cc-primary underline"> 前往登入 </NuxtLink>
      </span>
    </div>

    <!-- Sort toolbar -->
    <div v-if="wishlistProducts.length" class="mb-4 flex items-center justify-between">
      <span class="text-sm text-cc-grey-9f">共 {{ wishlistProducts.length }} 件收藏</span>
      <UiSelect v-model="sortBy" :options="sortOptions" class="min-w-36 w-auto" />
    </div>

    <div
      v-if="wishlistProducts.length"
      class="gap-4 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 xl:grid-cols-5"
    >
      <HomeProductCard v-for="product in wishlistProducts" :key="product.id" :product="product" />
    </div>

    <UiEmpty v-else description="還沒有收藏的商品">
      <NuxtLink v-if="!loggedIn" to="/login" class="text-sm text-cc-primary mt-2 underline">
        登入查看已儲存的收藏
      </NuxtLink>
    </UiEmpty>
  </div>
</template>
