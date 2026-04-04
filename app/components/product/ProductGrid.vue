<script setup lang="ts">
import type { Product, Sort } from '~/types'
import { sortMap } from '~/constants'
import { mapToArray } from '~/utils/mapToArray'

defineProps<{
  products: Product[]
  isLoading?: boolean
  emptyText?: string
  sort: Sort
}>()

const emit = defineEmits<{
  'update:sort': [value: Sort]
}>()

const sortOptions = mapToArray(sortMap)
</script>

<template>
  <div>
    <!-- Header: count + sort -->
    <div class="mb-4 flex items-center justify-between">
      <p class="text-body text-cc-grey-66">
        共 {{ products.length }} 項商品
      </p>
      <UiSelectSelect
        :model-value="sort"
        :options="sortOptions"
        class="w-48"
        @update:model-value="emit('update:sort', $event as Sort)"
      />
    </div>

    <!-- Loading skeleton -->
    <div v-if="isLoading" class="gap-4 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3">
      <ProductProductCardSkeleton v-for="i in 8" :key="i" />
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
