<script setup lang="ts">
import { cityData, cityImageMap, cityMap, cityPos } from '~/constants'
import { Sort } from '~/types'

const route = useRoute()
const router = useRouter()

const name = computed(() => route.params.name as string)
const cityName = computed(() => cityMap.get(name.value) || name.value)
const cityImage = computed(() => cityImageMap.get(name.value) || '')

// Find the English name for display (capitalize first letter)
const cityEnName = computed(() => {
  const slug = name.value
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
})

// Find region for "nearby cities"
const currentRegion = computed(() => {
  for (const [region, cities] of Object.entries(cityData)) {
    if (cities.includes(name.value))
      return region
  }
  return ''
})

const regionLabel = computed(() => cityPos.get(currentRegion.value) || '')

const nearbyCities = computed(() => {
  if (!currentRegion.value)
    return []
  return (cityData[currentRegion.value] || [])
    .filter(slug => slug !== name.value)
    .slice(0, 6)
    .map(slug => ({
      slug,
      name: cityMap.get(slug) || slug,
      image: cityImageMap.get(slug) || '',
    }))
})

// URL state
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

// Main products (paginated)
const { data, isLoading, isFetching } = useProducts(
  computed(() => ({
    city: name.value,
    category: selectedCategory.value || undefined,
    q: searchQuery.value || undefined,
    sort: currentSort.value,
    page: currentPage.value,
    limit: 12,
  })),
)

const products = computed(() => data.value?.products ?? [])
const pagination = computed(() => data.value?.pagination)
const totalCount = computed(() => pagination.value?.total ?? 0)

// Top rated products (separate query, always popular, limit 6)
const { data: topData } = useProducts(
  computed(() => ({
    city: name.value,
    sort: 'popular',
    limit: 6,
  })),
)
// Only show top section if 3+ products (avoid redundancy with grid)
const topProducts = computed(() => {
  const items = topData.value?.products ?? []
  return items.length >= 3 ? items : []
})

// Scroll to top on page change
watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

useSeoMeta({
  title: () => `${cityName.value} — 旅遊景點`,
  ogImage: () => cityImage.value,
})
</script>

<template>
  <div class="mx-auto px-4 py-6 max-w-[1296px]">
    <!-- Breadcrumb -->
    <UiBreadcrumb class="mb-4">
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
        <span class="text-cc-black">{{ cityName }}</span>
      </UiBreadcrumbItem>
    </UiBreadcrumb>

    <!-- Hero Banner -->
    <div class="mb-6 rounded-2xl aspect-[16/7] relative overflow-hidden md:aspect-[21/7]">
      <img
        :src="cityImage"
        :alt="cityName"
        fetchpriority="high"
        class="h-full w-full inset-0 absolute object-cover"
      >
      <div class="inset-0 absolute from-black/60 to-transparent via-black/20 bg-gradient-to-r" />
      <div class="p-6 bottom-0 left-0 absolute md:p-10">
        <p class="text-sm text-white/70 tracking-widest mb-1">
          {{ cityEnName.toUpperCase() }}
        </p>
        <h1 class="text-h2 text-white md:text-h1">
          {{ cityName }}
        </h1>
      </div>
      <div v-if="totalCount" class="bottom-6 right-6 absolute md:(bottom-10 right-10)">
        <div class="px-4 py-2 text-center rounded-xl bg-white/15 backdrop-blur-sm">
          <p class="text-2xl text-white font-bold">
            {{ totalCount }}
          </p>
          <p class="text-xs text-white/80">
            個景點
          </p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <ProductFilters
      :selected-city="name"
      :selected-category="selectedCategory"
      :sort="currentSort"
      :search-input="searchInput"
      :result-count="totalCount"
      hide-city
      class="mb-6"
      @update:selected-city="() => {}"
      @update:selected-category="
        (v: string) => updateQuery({ category: v || undefined, page: undefined })
      "
      @update:sort="(v: Sort) => updateQuery({ sort: v, page: undefined })"
      @update:search-input="searchInput = $event"
      @clear="
        () => {
          updateQuery({ category: undefined, q: undefined, sort: undefined, page: undefined });
          searchInput = '';
        }
      "
    />

    <!-- Top Rated Section -->
    <section v-if="topProducts.length" class="mb-8">
      <HomeSwiperProducts
        title="熱門推薦"
        :sec-title="`${cityName}最受歡迎的景點體驗`"
        :products="topProducts"
      />
    </section>

    <!-- All Products Section -->
    <section>
      <h2 class="text-h4 mb-4">
        所有商品
      </h2>

      <ProductGrid
        :products="products"
        :is-loading="isLoading"
        :is-fetching="isFetching"
        :empty-text="`${cityName} 目前沒有商品`"
      />

      <ProductPagination
        v-if="pagination"
        :pagination="pagination"
        @update:page="(v: number) => updateQuery({ page: v > 1 ? String(v) : undefined })"
      />
    </section>

    <!-- Sparse layout CTA -->
    <div
      v-if="!topProducts.length && products.length < 3"
      class="mb-8 p-6 text-center rounded-xl bg-cc-grey-f7"
    >
      <p class="text-body text-cc-grey-66 mb-3">
        想看更多旅遊體驗？
      </p>
      <NuxtLink to="/products" class="btn-primary">
        探索所有景點套票
      </NuxtLink>
    </div>

    <!-- Nearby Cities -->
    <section v-if="nearbyCities.length" class="mt-10 pt-8">
      <h2 class="text-h4 mb-1">
        探索附近城市
      </h2>
      <p class="text-sm text-cc-grey-9f mb-6">
        {{ regionLabel }}的其他熱門目的地
      </p>
      <div class="pb-2 flex gap-6 overflow-x-auto">
        <NuxtLink
          v-for="city in nearbyCities"
          :key="city.slug"
          :to="`/products/city/${city.slug}`"
          class="group flex flex-shrink-0 flex-col gap-2 items-center"
        >
          <div
            class="border-3 border-white rounded-full h-24 w-24 shadow-md transition-transform duration-300 overflow-hidden group-hover:scale-105"
          >
            <img
              :src="city.image"
              :alt="city.name"
              class="h-full w-full object-cover"
              loading="lazy"
            >
          </div>
          <span
            class="text-sm text-cc-black font-medium transition-colors group-hover:text-cc-primary"
          >
            {{ city.name }}
          </span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
