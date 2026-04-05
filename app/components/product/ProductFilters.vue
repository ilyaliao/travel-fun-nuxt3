<script setup lang="ts">
import type { Sort } from '~/types'
import { categoryMap, cityData, cityMap, cityPos, sortMap } from '~/constants'
import { mapToArray } from '~/utils/mapToArray'

const props = defineProps<{
  selectedCity: string
  selectedCategory: string
  sort: Sort
  searchInput: string
  resultCount?: number
  hideCity?: boolean
}>()

const emit = defineEmits<{
  'update:selectedCity': [value: string]
  'update:selectedCategory': [value: string]
  'update:sort': [value: Sort]
  'update:searchInput': [value: string]
  'clear': []
}>()

const categoryEntries = [...categoryMap.entries()]
const regionEntries = Object.entries(cityData) as [string, string[]][]
const sortOptions = mapToArray(sortMap)

const cityOpen = ref(false)

const selectedCityName = computed(() => {
  if (!props.selectedCity)
    return ''
  return cityMap.get(props.selectedCity) || props.selectedCity
})

const hasActiveFilters = computed(
  () => props.selectedCity !== '' || props.selectedCategory !== '' || props.searchInput !== '',
)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      role="toolbar"
      aria-label="篩選條件"
      class="px-4 py-3 rounded-xl bg-white flex flex-wrap gap-2 shadow-sm items-center"
    >
      <button
        type="button"
        class="text-sm px-4 py-1.5 border rounded-full transition"
        :class="
          selectedCategory === ''
            ? 'border-cc-primary bg-cc-primary text-white'
            : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary hover:text-cc-primary'
        "
        @click="emit('update:selectedCategory', '')"
      >
        全部
      </button>
      <button
        v-for="[key, label] in categoryEntries"
        :key="key"
        type="button"
        class="text-sm px-4 py-1.5 border rounded-full transition"
        :class="
          selectedCategory === key
            ? 'border-cc-primary bg-cc-primary text-white'
            : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary hover:text-cc-primary'
        "
        @click="emit('update:selectedCategory', key)"
      >
        {{ label }}
      </button>

      <div v-if="!hideCity" class="mx-1 bg-cc-grey-d4 h-6 w-px hidden sm:block" />

      <UiPopover v-if="!hideCity" v-model:open="cityOpen">
        <UiPopoverTrigger>
          <button
            type="button"
            aria-label="選擇地區"
            class="text-sm px-4 py-1.5 border rounded-full inline-flex gap-1 transition items-center"
            :class="
              selectedCity
                ? 'border-cc-primary bg-cc-primary/10 text-cc-primary'
                : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary hover:text-cc-primary'
            "
          >
            <div class="i-material-symbols-location-on-outline h-4 w-4" />
            {{ selectedCity ? selectedCityName : "選擇地區" }}
            <div class="i-material-symbols-expand-more h-4 w-4" />
          </button>
        </UiPopoverTrigger>
        <UiPopoverContent align="start" class="w-80">
          <div class="flex flex-col gap-3">
            <button
              type="button"
              class="text-sm px-3 py-1.5 border rounded-full w-fit transition"
              :class="
                selectedCity === ''
                  ? 'border-cc-primary bg-cc-primary text-white'
                  : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary'
              "
              @click="
                emit('update:selectedCity', '');
                cityOpen = false;
              "
            >
              全部地區
            </button>
            <div v-for="[region, cities] in regionEntries" :key="region">
              <p class="text-xs text-cc-grey-66 font-medium mb-1.5">
                {{ cityPos.get(region) }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="citySlug in cities"
                  :key="citySlug"
                  type="button"
                  class="text-xs px-3 py-1.5 border rounded-full transition"
                  :class="
                    selectedCity === citySlug
                      ? 'border-cc-primary bg-cc-primary text-white'
                      : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary'
                  "
                  @click="
                    emit('update:selectedCity', citySlug);
                    cityOpen = false;
                  "
                >
                  {{ cityMap.get(citySlug) }}
                </button>
              </div>
            </div>
          </div>
        </UiPopoverContent>
      </UiPopover>

      <div class="relative">
        <select
          :value="sort"
          aria-label="排序方式"
          class="text-sm text-cc-black py-1.5 pl-4 pr-9 appearance-none border border-cc-grey-d4 rounded-full bg-white cursor-pointer transition focus:(outline-none ring-2 ring-cc-primary) hover:border-cc-primary"
          @change="emit('update:sort', ($event.target as HTMLSelectElement).value as Sort)"
        >
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
        <div
          class="i-material-symbols-expand-more text-cc-grey-9f h-4 w-4 pointer-events-none right-3 top-1/2 absolute -translate-y-1/2"
        />
      </div>

      <div class="flex-1 hidden md:block" />

      <div class="w-full relative sm:w-auto">
        <div
          class="i-material-symbols-search text-cc-grey-9f h-4 w-4 left-3 top-1/2 absolute -translate-y-1/2"
        />
        <input
          :value="searchInput"
          type="text"
          placeholder="搜尋景點..."
          aria-label="搜尋景點"
          class="text-sm py-1.5 pl-9 pr-3 border border-cc-grey-d4 rounded-full bg-white w-full transition focus:(outline-none border-cc-primary ring-2 ring-cc-primary) sm:w-48"
          @input="emit('update:searchInput', ($event.target as HTMLInputElement).value)"
        >
      </div>

      <button
        v-if="hasActiveFilters"
        type="button"
        class="text-xs text-cc-grey-66 px-3 py-1.5 rounded-full transition hover:text-cc-accent hover:bg-cc-accent/5"
        @click="emit('clear')"
      >
        清除篩選
      </button>
    </div>

    <p v-if="resultCount !== undefined" class="text-sm text-cc-grey-66">
      共 {{ resultCount }} 項商品
    </p>
  </div>
</template>
