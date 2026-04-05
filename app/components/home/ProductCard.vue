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
    class="group rounded-xl bg-white flex flex-col shadow-sm transition-all duration-300 overflow-hidden hover:(shadow-md -translate-y-1)"
  >
    <!-- Image -->
    <div class="relative">
      <div
        v-if="!notRanking"
        class="text-sm text-white text-center rounded-br-[5px] bg-cc-accent h-[25px] w-[25px] left-0 top-0 absolute z-10"
      >
        {{ ranking }}
      </div>

      <!-- Category badge -->
      <div
        class="text-xs text-white px-2.5 py-0.5 rounded-full bg-cc-overlay left-2.5 top-2.5 absolute z-10"
      >
        {{ categoryName }}
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

      <img
        :src="product.imageUrl"
        :alt="product.title"
        loading="lazy"
        class="w-full aspect-[4/3] object-cover"
      >
    </div>

    <!-- Card body -->
    <div class="p-3 flex flex-1 flex-col gap-1">
      <div class="text-xs text-cc-grey-66 inline-flex gap-1 items-center">
        <div class="i-material-symbols-location-on-outline h-4 w-4" />
        {{ cityName }}
      </div>
      <h4 class="text-sm text-cc-black font-medium flex-1 line-clamp-2">
        {{ product.title }}
      </h4>
      <UiRating :value="product.evaluate" :count="product.evaluateNum" />
      <div class="inline-flex gap-2 items-baseline">
        <span class="text-base text-cc-accent font-bold">
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
