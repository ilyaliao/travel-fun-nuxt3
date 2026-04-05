<script setup lang="ts">
import type { City } from '~/types'

defineProps<{
  hotCitys: City[]
}>()

const _mainCity = computed(() => (hotCitys: City[]) => (hotCitys.length > 0 ? hotCitys[0] : null))
</script>

<template>
  <div class="pb-6 pt-12 bg-cc-grey-f7/80 md:pb-20">
    <div class="mx-auto px-3 w-full md:px-4 xl:px-0 lg:max-w-[1296px]">
      <HomeSectionTitle title="熱門城市" sec-title="探索最熱門的城市，發現更多令人驚嘆的旅程！" />
      <div v-if="hotCitys" class="gap-3 grid grid-rows-2 md:(gap-6 grid-flow-col)">
        <NuxtLink
          v-if="hotCitys[0]"
          :to="`/products/city/${hotCitys[0].enName.toLowerCase()}`"
          class="rounded-[5px] col-span-2 row-span-2 relative overflow-hidden"
        >
          <img
            :src="hotCitys[0].image"
            :alt="hotCitys[0].name"
            class="h-full w-full aspect-[4/3] cursor-pointer transition-transform duration-500 object-cover hover:scale-110"
            style="transform: translateZ(0)"
          >
          <div class="text-white font-bold bottom-3 left-3 absolute">
            <h3 class="mb-1">
              {{ hotCitys[0].name }}
            </h3>
            <p>{{ hotCitys[0].enName }}</p>
          </div>
        </NuxtLink>
        <NuxtLink
          v-for="city in hotCitys.slice(1)"
          :key="city.name"
          :to="`/products/city/${city.enName.toLowerCase()}`"
          class="rounded-[5px] relative overflow-hidden"
        >
          <img
            :src="city.image"
            :alt="city.name"
            class="h-full w-full aspect-[4/3] cursor-pointer transition-transform duration-500 object-cover hover:scale-110"
            style="transform: translateZ(0)"
            loading="lazy"
          >
          <div class="text-white font-bold bottom-3 left-3 absolute">
            <p class="text-lg mb-1">
              {{ city.name }}
            </p>
            <p class="text-sm">
              {{ city.enName }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
