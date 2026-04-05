<script setup lang="ts">
import { Sort } from '~/types'

const route = useRoute()
const router = useRouter()

// URL as single source of truth
const selectedCity = computed(() => (route.query.city as string) || '')
const selectedCategory = computed(() => (route.query.category as string) || '')
const currentSort = computed(() => (route.query.sort as Sort) || Sort.Popular)
const searchQuery = computed(() => (route.query.q as string) || '')
const currentPage = computed(() => Number(route.query.page) || 1)

// Local search input with debounce
const searchInput = ref(searchQuery.value)
watchDebounced(
  searchInput,
  (val) => {
    updateQuery({ q: val || undefined, page: undefined })
  },
  { debounce: 300 },
)

// Sync search input when URL changes externally
watch(searchQuery, (val) => {
  if (val !== searchInput.value)
    searchInput.value = val
})

function updateQuery(patch: Record<string, string | undefined>) {
  const query = { ...route.query }
  for (const [key, val] of Object.entries(patch)) {
    if (val)
      query[key] = val
    else delete query[key]
  }
  router.replace({ query })
}

// Server-side filtered data
const { data, isLoading, asyncStatus } = useProducts(
  computed(() => ({
    city: selectedCity.value || undefined,
    category: selectedCategory.value || undefined,
    q: searchQuery.value || undefined,
    sort: currentSort.value,
    page: currentPage.value,
    limit: 12,
  })),
)

const products = computed(() => data.value?.products ?? [])
const pagination = computed(() => data.value?.pagination)
const resultCount = computed(() => pagination.value?.total ?? products.value.length)

// Scroll to top when page changes
watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

useSeoMeta({ title: '景點套票' })
</script>

<template>
  <div class="mx-auto px-4 py-6 max-w-[1296px]">
    <UiBreadcrumb class="mb-4">
      <UiBreadcrumbItem>
        <NuxtLink to="/" class="hover:text-cc-primary">
          首頁
        </NuxtLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <span class="text-cc-black">景點套票</span>
      </UiBreadcrumbItem>
    </UiBreadcrumb>

    <div class="mb-6 rounded-2xl relative overflow-hidden">
      <img
        src="/images/banner.jpg"
        alt=""
        class="h-full w-full inset-0 absolute object-cover"
        fetchpriority="high"
      >
      <div class="inset-0 absolute from-cc-primary/90 to-cc-primary/50 bg-gradient-to-r" />
      <div class="px-6 py-8 relative md:(px-10 py-10)">
        <h1 class="text-h3 text-white tracking-normal md:text-h2">
          景點套票
        </h1>
        <p class="text-base text-white/80 mt-2">
          共 {{ resultCount }} 個景點體驗等你探索
        </p>
      </div>
    </div>

    <ProductFilters
      :selected-city="selectedCity"
      :selected-category="selectedCategory"
      :sort="currentSort"
      :search-input="searchInput"
      :result-count="resultCount"
      class="mb-6"
      @update:selected-city="(v: string) => updateQuery({ city: v || undefined, page: undefined })"
      @update:selected-category="
        (v: string) => updateQuery({ category: v || undefined, page: undefined })
      "
      @update:sort="(v: Sort) => updateQuery({ sort: v, page: undefined })"
      @update:search-input="searchInput = $event"
      @clear="
        () => {
          updateQuery({
            city: undefined,
            category: undefined,
            q: undefined,
            sort: undefined,
            page: undefined,
          });
          searchInput = '';
        }
      "
    />

    <ProductGrid :products :is-loading="isLoading" :is-fetching="asyncStatus === 'loading'" />

    <ProductPagination
      v-if="pagination"
      :pagination
      @update:page="(v: number) => updateQuery({ page: v > 1 ? String(v) : undefined })"
    />
  </div>
</template>
