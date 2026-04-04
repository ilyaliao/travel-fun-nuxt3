<script setup lang="ts">
import { categoryMap, cityMap } from '~/constants'
import { Sort } from '~/types'

const route = useRoute()
const productStore = useProductStore()

const name = computed(() => route.params.name as string)
const cityName = computed(() => cityMap.get(name.value) || name.value)

const currentSort = ref<Sort>(Sort.Popular)
const selectedCategory = ref('')

const { data, isLoading } = useAllProducts()

const categoryEntries = [...categoryMap.entries()]

const cityProducts = computed(() => {
  if (!data.value?.products)
    return []
  // City & category are stored as slugs/keys in Product data
  const result = productStore.getFilterData(
    data.value.products,
    name.value,
    selectedCategory.value,
    0,
  )
  return productStore.getSortData(result, currentSort.value)
})

useSeoMeta({
  title: () => `${cityName.value} — 旅遊景點`,
})
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
        <NuxtLink to="/products" class="hover:text-cc-primary">
          景點套票
        </NuxtLink>
      </UiBreadcrumbBreadcrumbItem>
      <UiBreadcrumbBreadcrumbSeparator />
      <UiBreadcrumbBreadcrumbItem>
        <span class="text-cc-black">{{ cityName }}</span>
      </UiBreadcrumbBreadcrumbItem>
    </UiBreadcrumbBreadcrumb>

    <h1 class="text-h2 mb-6">
      {{ cityName }}
    </h1>

    <!-- Category chips -->
    <div class="mb-6 flex flex-wrap gap-2">
      <button
        type="button"
        class="text-sm px-3 py-1 border rounded-full transition"
        :class="
          selectedCategory === ''
            ? 'border-cc-primary bg-cc-primary text-white'
            : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary hover:text-cc-primary'
        "
        @click="selectedCategory = ''"
      >
        全部
      </button>
      <button
        v-for="[key, label] in categoryEntries"
        :key="key"
        type="button"
        class="text-sm px-3 py-1 border rounded-full transition"
        :class="
          selectedCategory === key
            ? 'border-cc-primary bg-cc-primary text-white'
            : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary hover:text-cc-primary'
        "
        @click="selectedCategory = key"
      >
        {{ label }}
      </button>
    </div>

    <ProductProductGrid
      :products="cityProducts"
      :is-loading="isLoading"
      :sort="currentSort"
      :empty-text="`${cityName} 目前沒有商品`"
      @update:sort="currentSort = $event"
    />
  </div>
</template>
