<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from 'radix-vue'
import { cityData, cityMap, cityPos } from '~/constants'

const open = ref(false)
const expandedRegion = ref<string | null>(null)

function toggleRegion(key: string) {
  expandedRegion.value = expandedRegion.value === key ? null : key
}

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
  <DialogRoot v-model:open="open">
    <DialogTrigger class="icon-btn" aria-label="選單">
      <div class="i-material-symbols-menu h-6 w-6" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="bg-cc-overlay inset-0 fixed z-50" />
      <DialogContent
        class="p-6 bg-white h-full max-w-sm w-3/4 shadow-lg inset-y-0 right-0 fixed z-50"
      >
        <DialogClose class="opacity-70 right-4 top-4 absolute hover:opacity-100">
          <div class="i-material-symbols-close text-cc-black h-5 w-5" />
        </DialogClose>

        <nav class="mt-8 flex flex-col gap-4">
          <div>
            <button
              v-for="region in regions"
              :key="region.key"
              class="text-left w-full cursor-pointer"
            >
              <div
                class="text-body text-cc-black font-medium py-2 flex items-center justify-between"
                @click="toggleRegion(region.key)"
              >
                <span class="text-cc-accent">{{ region.label }}</span>
                <div
                  class="i-material-symbols-expand-more h-4 w-4 transition-transform"
                  :class="expandedRegion === region.key && 'rotate-180'"
                />
              </div>
              <div v-if="expandedRegion === region.key" class="pb-2 pl-2 flex flex-wrap gap-2">
                <NuxtLink
                  v-for="city in region.cities"
                  :key="city.key"
                  :to="`/city/${city.key}`"
                  class="text-body text-cc-grey-66 hover:text-cc-primary"
                  @click="open = false"
                >
                  {{ city.name }}
                </NuxtLink>
              </div>
            </button>
          </div>

          <div class="bg-cc-grey-e9 h-px" />

          <NuxtLink
            to="/products"
            class="text-body text-cc-black py-2 flex gap-2 items-center"
            @click="open = false"
          >
            <div class="i-material-symbols-confirmation-number-outline h-5 w-5" />
            景點套票
          </NuxtLink>
          <NuxtLink
            to="/tours"
            class="text-body text-cc-black py-2 flex gap-2 items-center"
            @click="open = false"
          >
            <div class="i-material-symbols-hiking h-5 w-5" />
            觀光行程
          </NuxtLink>

          <div class="bg-cc-grey-e9 h-px" />

          <NuxtLink
            to="/login"
            class="text-body text-cc-black py-2 flex gap-2 items-center"
            @click="open = false"
          >
            <div class="i-material-symbols-person-outline h-5 w-5" />
            登入／註冊
          </NuxtLink>
        </nav>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
