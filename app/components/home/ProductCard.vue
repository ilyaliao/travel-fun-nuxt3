<script setup lang="ts">
import type { Product } from '~/types'
import { cityMap } from '~/constants'
import { currency } from '~/utils/currency'

const props = defineProps<{
  product: Product
  notRanking?: boolean
  ranking?: number
}>()

const favoriteStore = useFavoriteStore()
const { addFavorite, removeFavorite, checkFavorite } = favoriteStore

const product = toRef(props, 'product')
const cityName = computed(() => cityMap.get(product.value.city) || product.value.city)
</script>

<template>
  <NuxtLink
    :to="`/product/${product.id}`"
    class="group flex flex-col cursor-pointer transition-all duration-300 items-start relative hover:brightness-[.8]"
  >
    <div
      v-if="!notRanking"
      class="text-sm text-white text-center rounded-br-[5px] bg-cc-accent h-[25px] w-[25px] left-0 top-0 absolute"
    >
      {{ ranking }}
    </div>
    <div class="text-white right-[10px] top-[10px] absolute z-10">
      <button
        v-if="checkFavorite(product.id)"
        type="button"
        aria-label="取消收藏"
        class="p-2 cursor-pointer -m-2 focus-visible:(outline-none rounded-full ring-2 ring-white/70)"
        @click.prevent="removeFavorite(product.id, product.title)"
      >
        <div
          class="i-material-symbols-favorite text-cc-accent h-6 w-6 transition-transform duration-300 hover:scale-125"
        />
      </button>
      <button
        v-else
        type="button"
        aria-label="加入收藏"
        class="p-2 cursor-pointer -m-2 focus-visible:(outline-none rounded-full ring-2 ring-white/70)"
        @click.prevent="addFavorite(product.id, product.title)"
      >
        <div
          class="i-material-symbols-favorite-outline h-6 w-6 transition-transform duration-300 hover:scale-125"
        />
      </button>
    </div>
    <img
      :src="product.imageUrl"
      :alt="product.title"
      loading="lazy"
      class="mb-2 w-full aspect-square object-cover"
    >
    <div class="px-1 flex flex-col gap-1 h-[120px] w-full">
      <div class="text-sm text-cc-grey-9f inline-flex gap-1">
        <div class="i-material-symbols-location-on-outline h-5 w-5" />
        {{ cityName }}
      </div>
      <h4 class="text-sm flex-1 line-clamp-2">
        {{ product.title }}
      </h4>
      <div class="flex gap-1 items-center">
        <UiRating :value="product.evaluate" :count="product.evaluateNum" />
      </div>
      <div class="inline-flex gap-1 items-center">
        <h6 class="text-base font-bold">
          {{ currency(product.price) }}
        </h6>
        <p class="text-sm text-cc-grey-9f line-through">
          {{ currency(product.origin_price, "$") }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
