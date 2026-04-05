<script setup lang="ts">
import type { Product } from '~/types'

defineProps<{
  products: Product[]
  isLoading?: boolean
  isFetching?: boolean
  emptyText?: string
}>()
</script>

<template>
  <div class="relative">
    <!-- Loading skeleton (initial load) -->
    <div v-if="isLoading" class="gap-4 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3">
      <ProductCardSkeleton v-for="i in 8" :key="i" />
    </div>

    <!-- Product grid -->
    <div
      v-else-if="products.length"
      class="gap-4 grid grid-cols-2 transition-opacity duration-300 lg:grid-cols-4 sm:grid-cols-3"
      :class="isFetching ? 'opacity-50 pointer-events-none' : 'opacity-100'"
    >
      <HomeProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        not-ranking
      />
    </div>

    <!-- Empty -->
    <UiEmpty v-else :description="emptyText ?? '找不到符合的商品'" />

    <!-- Fetching overlay spinner -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isFetching && !isLoading && products.length"
        class="flex items-center left-1/2 top-1/3 justify-center absolute -translate-x-1/2"
      >
        <div class="i-material-symbols-progress-activity text-cc-primary h-8 w-8 animate-spin" />
      </div>
    </Transition>
  </div>
</template>
