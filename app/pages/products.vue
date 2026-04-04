<script setup lang="ts">
import { sortMap } from '~/constants'
import { Sort } from '~/types'
import { mapToArray } from '~/utils/mapToArray'

const route = useRoute()
const productStore = useProductStore()
const { data, isLoading } = useAllProducts()

const currentSort = ref<Sort>(Sort.Popular)

const sortOptions = mapToArray(sortMap)

const sortedProducts = computed(() => {
  if (!data.value?.products)
    return []
  return productStore.getSortData(data.value.products, currentSort.value)
})

const searchQuery = computed(() => (route.query.q as string) || '')

const filteredProducts = computed(() => {
  if (!searchQuery.value)
    return sortedProducts.value
  const q = searchQuery.value.toLowerCase()
  return sortedProducts.value.filter(
    p => p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q),
  )
})

useSeoMeta({ title: '景點套票' })
</script>

<template>
  <div class="max-w-cc-width mx-auto px-4 py-8">
    <UiBreadcrumbBreadcrumb class="mb-6">
      <UiBreadcrumbBreadcrumbItem>
        <NuxtLink to="/" class="hover:text-cc-primary">
          首頁
        </NuxtLink>
      </UiBreadcrumbBreadcrumbItem>
      <UiBreadcrumbBreadcrumbSeparator />
      <UiBreadcrumbBreadcrumbItem>
        <span class="text-cc-black">景點套票</span>
      </UiBreadcrumbBreadcrumbItem>
    </UiBreadcrumbBreadcrumb>

    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-h3">
        景點套票
      </h1>

      <!-- Sort -->
      <UiSelectSelect
        :model-value="currentSort"
        :options="sortOptions"
        class="w-48"
        @update:model-value="currentSort = $event as Sort"
      />
    </div>

    <div v-if="isLoading" class="py-20 flex items-center justify-center">
      <div class="i-material-symbols-progress-activity text-cc-primary h-8 w-8 animate-spin" />
    </div>

    <div
      v-else-if="filteredProducts.length"
      class="gap-4 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 xl:grid-cols-5"
    >
      <HomeProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <UiEmpty v-else description="找不到符合的商品" />
  </div>
</template>
