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
const { data, isLoading } = useProducts(
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

// Mobile filter sheet
const filterSheetOpen = ref(false)

useSeoMeta({ title: '景點套票' })
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
        <span class="text-cc-black">景點套票</span>
      </UiBreadcrumbBreadcrumbItem>
    </UiBreadcrumbBreadcrumb>

    <h1 class="text-h3 mb-6">
      景點套票
    </h1>

    <div class="flex gap-8">
      <!-- Desktop sidebar -->
      <aside class="shrink-0 w-56 hidden lg:block">
        <ProductProductFilters
          :selected-city="selectedCity"
          :selected-category="selectedCategory"
          @update:selected-city="(v) => updateQuery({ city: v || undefined, page: undefined })"
          @update:selected-category="
            (v) => updateQuery({ category: v || undefined, page: undefined })
          "
        />
      </aside>

      <!-- Mobile filter sheet -->
      <UiSheetSheet v-model:open="filterSheetOpen">
        <UiSheetSheetTrigger class="lg:hidden">
          <UiButtonButton variant="outline" size="sm">
            <div class="i-material-symbols-filter-list mr-1 h-4 w-4" />
            篩選
          </UiButtonButton>
        </UiSheetSheetTrigger>
        <UiSheetSheetContent side="left">
          <div class="mt-8">
            <ProductProductFilters
              :selected-city="selectedCity"
              :selected-category="selectedCategory"
              @update:selected-city="
                (v) => {
                  updateQuery({ city: v || undefined, page: undefined });
                  filterSheetOpen = false;
                }
              "
              @update:selected-category="
                (v) => {
                  updateQuery({ category: v || undefined, page: undefined });
                  filterSheetOpen = false;
                }
              "
            />
          </div>
        </UiSheetSheetContent>
      </UiSheetSheet>

      <!-- Main content -->
      <div class="flex-1 min-w-0">
        <!-- Search -->
        <UiInputInput v-model="searchInput" placeholder="搜尋景點名稱或城市..." class="mb-4" />

        <ProductProductGrid
          :products="products"
          :is-loading="isLoading"
          :sort="currentSort"
          @update:sort="(v) => updateQuery({ sort: v, page: undefined })"
        />

        <ProductProductPagination
          v-if="pagination"
          :pagination="pagination"
          @update:page="(v) => updateQuery({ page: v > 1 ? String(v) : undefined })"
        />
      </div>
    </div>
  </div>
</template>
