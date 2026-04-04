<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'radix-vue'
import { cityData, cityMap, cityPos } from '~/constants'

const open = ref(false)

const regions = Array.from(cityPos.entries()).map(([key, label]) => ({
  key,
  label,
  cities: (cityData[key] || []).map((cityKey: string) => ({
    key: cityKey,
    name: cityMap.get(cityKey) || cityKey,
  })),
}))
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger
      class="text-btn px-3 py-1 border border-current/30 rounded-full flex gap-1 items-center hover:opacity-80"
    >
      選地區
      <div
        class="i-material-symbols-expand-more h-4 w-4 transition-transform"
        :class="open && 'rotate-180'"
      />
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        class="text-cc-black p-6 border border-cc-grey-e9 rounded-xl bg-white w-[600px] shadow-lg z-50"
        :side-offset="8"
        align="start"
      >
        <div v-for="region in regions" :key="region.key" class="mb-4 last:mb-0">
          <h4 class="text-sm text-cc-accent font-medium mb-2">
            {{ region.label }}
          </h4>
          <div class="mb-2 bg-cc-grey-e9 h-px" />
          <div class="flex flex-wrap gap-x-6 gap-y-1">
            <NuxtLink
              v-for="city in region.cities"
              :key="city.key"
              :to="`/city/${city.key}`"
              class="text-body text-cc-black hover:text-cc-primary"
              @click="open = false"
            >
              {{ city.name }}
            </NuxtLink>
          </div>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
