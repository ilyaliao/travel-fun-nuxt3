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
        <span class="text-cc-black">{{ categoryName }}</span>
      </UiBreadcrumbBreadcrumbItem>
    </UiBreadcrumbBreadcrumb>

    <h1 class="text-h2 mb-6">
      {{ categoryName }}
    </h1>

    <ProductProductGrid
      :products="products"
      :is-loading="isLoading"
      :sort="currentSort"
      :empty-text="`${categoryName} 目前沒有商品`"
      @update:sort="(v) => updateQuery({ sort: v, page: undefined })"
    />

    <ProductProductPagination
      v-if="pagination"
      :pagination="pagination"
      @update:page="(v) => updateQuery({ page: v > 1 ? String(v) : undefined })"
    />
  </div>
</template>
