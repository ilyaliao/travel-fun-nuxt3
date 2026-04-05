<script setup lang="ts">
import type { Product } from '~/types'

defineProps<{
  products: Product[]
  isLoading?: boolean
  emptyText?: string
}>()
</script>

<template>
  <div>
    <!-- Loading skeleton -->
    <div v-if="isLoading" class="gap-4 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3">
      <ProductCardSkeleton v-for="i in 8" :key="i" />
    </div>

    <!-- Product grid -->
    <div v-else-if="products.length" class="gap-4 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3">
      <HomeProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        not-ranking
      />
    </div>

    <!-- Empty -->
    <UiEmpty v-else :description="emptyText ?? '找不到符合的商品'" />
  </div>
</template>
