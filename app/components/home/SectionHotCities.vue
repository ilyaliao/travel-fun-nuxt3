<script setup lang="ts">
import { mockHotCitys } from '~/constants'
</script>

<template>
  <section class="max-w-cc-width mx-auto px-4 py-12">
    <HomeSectionTitle title="熱門城市" subtitle="探索台灣，發現更多令人驚嘆的旅程！" />

    <!-- Asymmetric grid: 1 large + 4 small -->
    <div class="gap-4 grid grid-cols-2 lg:(grid-cols-3 grid-rows-2)">
      <!-- Large card -->
      <NuxtLink
        v-if="mockHotCitys[0]"
        :to="`/city/${mockHotCitys[0].enName.toLowerCase()}`"
        class="group rounded-xl col-span-2 relative overflow-hidden lg:(col-span-1 row-span-2)"
      >
        <div class="aspect-[4/3] lg:h-full">
          <NuxtImg
            :src="mockHotCitys[0].image"
            :alt="mockHotCitys[0].name"
            class="img-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div class="text-white p-4 bottom-0 left-0 absolute">
          <h3 class="text-h3 font-bold">
            {{ mockHotCitys[0].name }}
          </h3>
          <p class="text-body opacity-80">
            {{ mockHotCitys[0].enName }}
          </p>
        </div>
        <div class="inset-0 absolute from-cc-black/50 to-transparent bg-gradient-to-t" />
      </NuxtLink>

      <!-- Small cards -->
      <NuxtLink
        v-for="city in mockHotCitys.slice(1)"
        :key="city.enName"
        :to="`/city/${city.enName.toLowerCase()}`"
        class="group rounded-xl relative overflow-hidden"
      >
        <div class="aspect-[16/10]">
          <NuxtImg
            :src="city.image"
            :alt="city.name"
            class="img-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div class="text-white p-3 bottom-0 left-0 absolute">
          <h3 class="text-body font-bold">
            {{ city.name }}
          </h3>
          <p class="text-xs opacity-80">
            {{ city.enName }}
          </p>
        </div>
        <div class="inset-0 absolute from-cc-black/40 to-transparent bg-gradient-to-t" />
      </NuxtLink>
    </div>
  </section>
</template>
