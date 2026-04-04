<script setup lang="ts">
const favoriteStore = useFavoriteStore()
const { data } = useAllProducts()

const wishlistProducts = computed(() => {
  if (!data.value?.products)
    return []
  return data.value.products.filter(p => favoriteStore.checkFavorite(p.id))
})

useSeoMeta({ title: '收藏清單' })
</script>

<template>
  <div class="mx-auto px-4 py-8 max-w-[1296px]">
    <UiBreadcrumbBreadcrumb class="mb-6">
      <UiBreadcrumbBreadcrumbItem>
        <NuxtLink to="/" class="hover:text-cc-primary">
          首頁
        </NuxtLink>
      </UiBreadcrumbBreadcrumbItem>
      <UiBreadcrumbBreadcrumbSeparator />
      <UiBreadcrumbBreadcrumbItem>
        <span class="text-cc-black">收藏清單</span>
      </UiBreadcrumbBreadcrumbItem>
    </UiBreadcrumbBreadcrumb>

    <h1 class="text-h3 mb-6">
      收藏清單
    </h1>

    <div
      v-if="wishlistProducts.length"
      class="gap-4 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 xl:grid-cols-5"
    >
      <HomeProductCard v-for="product in wishlistProducts" :key="product.id" :product="product" />
    </div>

    <UiEmpty v-else description="還沒有收藏的商品" />
  </div>
</template>
