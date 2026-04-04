<script setup lang="ts">
import { categoryMap, cityData, cityMap, cityPos } from '~/constants'

defineProps<{
  selectedCity: string
  selectedCategory: string
  hideCity?: boolean
}>()

const emit = defineEmits<{
  'update:selectedCity': [value: string]
  'update:selectedCategory': [value: string]
}>()

const categoryEntries = [...categoryMap.entries()]
const regionEntries = Object.entries(cityData) as [string, string[]][]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Category -->
    <div>
      <h3 class="text-body font-bold mb-3">
        分類
      </h3>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="text-sm px-3 py-1 border rounded-full transition"
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
          class="text-sm px-3 py-1 border rounded-full transition"
          :class="
            selectedCategory === key
              ? 'border-cc-primary bg-cc-primary text-white'
              : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary hover:text-cc-primary'
          "
          @click="emit('update:selectedCategory', key)"
        >
          {{ label }}
        </button>
      </div>
    </div>

    <!-- City by region -->
    <div v-if="!hideCity">
      <h3 class="text-body font-bold mb-3">
        地區
      </h3>

      <button
        type="button"
        class="text-sm mb-3 px-3 py-1 border rounded-full transition"
        :class="
          selectedCity === ''
            ? 'border-cc-primary bg-cc-primary text-white'
            : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary hover:text-cc-primary'
        "
        @click="emit('update:selectedCity', '')"
      >
        全部地區
      </button>

      <div class="flex flex-col gap-4">
        <div v-for="[region, cities] in regionEntries" :key="region">
          <p class="text-xs text-cc-grey-9f font-medium mb-2">
            {{ cityPos.get(region) }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="citySlug in cities"
              :key="citySlug"
              type="button"
              class="text-xs px-2.5 py-0.5 border rounded-full transition"
              :class="
                selectedCity === citySlug
                  ? 'border-cc-primary bg-cc-primary text-white'
                  : 'border-cc-grey-d4 text-cc-black hover:border-cc-primary hover:text-cc-primary'
              "
              @click="emit('update:selectedCity', citySlug)"
            >
              {{ cityMap.get(citySlug) }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
