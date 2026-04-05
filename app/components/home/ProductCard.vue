<script setup lang="ts">
import type { Product } from '~/types'
import { categoryMap, cityMap } from '~/constants'
import { currency } from '~/utils/currency'

const props = defineProps<{
  product: Product
  notRanking?: boolean
  ranking?: number
}>()

const { checkFavorite, toggleFavorite } = useFavoriteHelpers()

const product = toRef(props, 'product')
const cityName = computed(() => cityMap.get(product.value.city) || product.value.city)
const categoryName = computed(
  () => categoryMap.get(product.value.category) || product.value.category,
)
</script>

<template>
  <NuxtLink
    :to="`/products/${product.id}`"
    class="group rounded-2xl bg-white flex flex-col shadow-sm transition-shadow duration-300 overflow-hidden hover:shadow-md"
  >
    <!-- Image -->
    <div class="bg-cc-grey-e9 relative overflow-hidden">
      <!-- Ranking badge -->
      <div
        v-if="!notRanking"
        class="text-sm text-white font-bold text-center rounded-br-lg bg-cc-accent flex h-[30px] w-[30px] items-center left-0 top-0 justify-center absolute z-10"
      >
        {{ ranking }}
      </div>

      <!-- Favorite button -->
      <button
        v-if="checkFavorite(product.id)"
        type="button"
        aria-label="取消收藏"
        class="p-1.5 rounded-full bg-white cursor-pointer shadow-sm transition-transform duration-200 right-2.5 top-2.5 absolute z-10 focus-visible:(outline-none ring-2 ring-cc-primary) hover:scale-110"
        @click.prevent="toggleFavorite(product.id, product.title)"
      >
        <div class="i-material-symbols-favorite text-cc-accent h-5 w-5" />
      </button>
      <button
        v-else
        type="button"
        aria-label="加入收藏"
        class="p-1.5 rounded-full bg-white cursor-pointer shadow-sm transition-transform duration-200 right-2.5 top-2.5 absolute z-10 focus-visible:(outline-none ring-2 ring-cc-primary) hover:scale-110"
        @click.prevent="toggleFavorite(product.id, product.title)"
      >
        <div class="i-material-symbols-favorite-outline text-cc-grey-9f h-5 w-5" />
      </button>

      <!-- Category badge -->
      <div
        class="text-xs text-white px-2.5 py-0.5 rounded-full bg-white/20 bottom-2.5 left-2.5 absolute z-10 backdrop-blur-sm"
      >
        {{ categoryName }}
      </div>

      <img
        :src="product.imageUrl"
        :alt="product.title"
        loading="lazy"
        class="w-full aspect-[4/3] transition-all duration-300 ease-out object-cover group-hover:(opacity-85 scale-106)"
      >
    </div>

    <!-- Card body -->
    <div class="p-3 flex flex-1 flex-col gap-1.5">
      <h4 class="text-sm text-cc-black leading-snug font-semibold flex-1 line-clamp-2">
        {{ product.title }}
      </h4>
      <div class="inline-flex flex-wrap gap-1.5 items-center">
        <span
          class="text-xs text-cc-grey-66 px-2 py-0.5 rounded bg-cc-grey-f7 inline-flex gap-1 items-center"
        >
          <span class="i-material-symbols-location-on-outline h-3.5 w-3.5" />
          {{ cityName }}
        </span>
        <span
          class="text-xs text-cc-grey-66 px-2 py-0.5 rounded bg-cc-grey-f7 inline-flex gap-1 items-center"
        >
          <span class="i-material-symbols-star text-cc-accent h-3.5 w-3.5" />
          {{ product.evaluate.toFixed(1) }} ({{ product.evaluateNum }})
        </span>
      </div>
      <div class="mt-auto inline-flex gap-2 items-baseline tabular-nums">
        <span class="text-lg text-cc-accent tracking-tight font-bold">
          {{ currency(product.price) }}
        </span>
        <span
          v-if="product.origin_price > product.price"
          class="text-xs text-cc-grey-66 line-through"
        >
          {{ currency(product.origin_price, "$") }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
