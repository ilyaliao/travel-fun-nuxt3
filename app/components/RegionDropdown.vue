<script setup lang="ts">
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { cityData, cityMap, cityPos } from '~/constants'

const open = ref(false)
</script>

<template>
  <PopoverRoot v-model:open="open">
    <PopoverTrigger as-child>
      <button
        type="button"
        class="mx-auto border border-white rounded-[100px] flex gap-1 h-10 w-28 cursor-pointer items-center justify-center"
      >
        選地區
        <div class="i-material-symbols-expand-more h-5 w-5" />
      </button>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="text-cc-black rounded-[10px] bg-white shadow-lg z-50"
        :side-offset="8"
        align="start"
      >
        <div class="px-4 py-2 flex flex-col gap-3">
          <template v-for="(citys, key) in cityData" :key="key">
            <div class="text-sm">
              <p class="text-cc-accent py-1 border-b border-cc-accent w-full">
                {{ cityPos.get(key) }}
              </p>
              <div class="mt-2 flex flex-wrap gap-3 items-center">
                <NuxtLink
                  v-for="cityName in citys"
                  :key="cityName"
                  :to="`/products/city/${cityName}`"
                  class="text-sm text-cc-black cursor-pointer focus-visible:(text-cc-primary outline-none) hover:text-cc-primary"
                  @click="open = false"
                >
                  {{ cityMap.get(cityName) }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
