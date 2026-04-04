<script setup lang="ts">
import { categoryMap } from '~/constants'
import { Sort } from '~/types'

const route = useRoute()
const router = useRouter()

const cat = computed(() => route.params.cat as string)
const categoryName = computed(() => categoryMap.get(cat.value) || cat.value)

const currentSort = computed(() => (route.query.sort as Sort) || Sort.Popular)
const currentPage = computed(() => Number(route.query.page) || 1)

function updateQuery(patch: Record<string, string | undefined>) {
  const query = { ...route.query }
  for (const [key, val] of Object.entries(patch)) {
    if (val)
      query[key] = val
    else delete query[key]
  }
  router.replace({ query })
}

const { data, isLoading } = useProducts(
  computed(() => ({
    category: cat.value,
    sort: currentSort.value,
    page: currentPage.value,
    limit: 12,
  })),
)

const products = computed(() => data.value?.products ?? [])
const pagination = computed(() => data.value?.pagination)

useSeoMeta({
  title: () => `${categoryName.value} — 景點套票`,
})
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
        <NuxtLink to="/products" class="hover:text-cc-primary">
          景點套票
        </NuxtLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <span class="text-cc-black">{{ categoryName }}</span>
      </UiBreadcrumbItem>
    </UiBreadcrumb>

    <h1 class="text-h2 mb-6">
      {{ categoryName }}
    </h1>

    <ProductGrid
      :products
      :is-loading="isLoading"
      :empty-text="`${categoryName} 目前沒有商品`"
    />

    <ProductPagination
      v-if="pagination"
      :pagination
      @update:page="(v: number) => updateQuery({ page: v > 1 ? String(v) : undefined })"
    />
  </div>
</template>
