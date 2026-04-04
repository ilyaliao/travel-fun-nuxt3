<script setup lang="ts">
import { cityMap } from '~/constants'

const route = useRoute()
const name = computed(() => route.params.name as string)
const cityName = computed(() => cityMap.get(name.value) || name.value)

const { data } = useAllProducts()

const cityProducts = computed(() => {
  if (!data.value?.products)
    return []
  return data.value.products.filter(p => p.city === cityName.value)
})

useSeoMeta({
  title: () => `${cityName.value} — 旅遊景點`,
})
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
        <span class="text-cc-black">{{ cityName }}</span>
      </UiBreadcrumbBreadcrumbItem>
    </UiBreadcrumbBreadcrumb>

    <h1 class="text-h2 mb-8">
      {{ cityName }}
    </h1>

    <div
      v-if="cityProducts.length"
      class="gap-4 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 xl:grid-cols-5"
    >
      <HomeProductCard v-for="product in cityProducts" :key="product.id" :product="product" />
    </div>

    <UiEmpty v-else :description="`${cityName} 目前沒有商品`" />
  </div>
</template>
