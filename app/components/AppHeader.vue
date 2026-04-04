<script setup lang="ts">
import { useCartQuery } from '~/composables/queries/useCarts'
import { websiteConfig } from '~/config/website'

const route = useRoute()

const isFixed = computed(() => {
  const name = route.name as string
  return new Set(['index', 'city-name', 'country-name']).has(name)
})

const { data: favData } = useFavoritesQuery()
const hasFavorites = computed(() => (favData.value?.data?.length || 0) > 0)
const { data: cartData } = useCartQuery()
const cartCount = computed(() => cartData.value?.data?.carts?.length || 0)
</script>

<template>
  <header
    id="header"
    class="text-white px-6 py-3 bg-black/30 flex h-16 top-0 justify-center z-20 backdrop-blur-[25px]"
    :class="isFixed ? 'fixed left-0 right-0' : 'sticky'"
  >
    <div class="mx-auto w-full md:px-4 xl:px-0 lg:max-w-[1296px]">
      <div class="flex w-full justify-between">
        <div class="flex items-center md:hidden">
          <MobileMenu />
        </div>

        <div class="flex gap-8 items-center lg:w-[526px]">
          <NuxtLink to="/">
            <img class="h-10 object-cover" :src="websiteConfig.logoImage" alt="Travel Fun 首頁">
          </NuxtLink>
          <ul class="flex-1 gap-1 h-full hidden items-center md:flex">
            <li class="text-sm text-center flex-1">
              <RegionDropdown />
            </li>
            <li class="text-sm text-center flex-1">
              <NuxtLink to="/products" class="flex gap-2 items-center justify-center">
                <div class="i-material-symbols-confirmation-number-outline h-6 w-6" />
                景點套票
              </NuxtLink>
            </li>
            <li class="text-sm text-center flex-1">
              <NuxtLink to="/tours" class="flex gap-2 items-center justify-center">
                <div class="i-material-symbols-flight-takeoff h-6 w-6" />
                觀光行程
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="flex gap-4 items-center lg:gap-0 lg:w-[256px] lg:justify-between">
          <div class="hidden place-content-center md:grid">
            <NuxtLink
              to="/wishlist"
              aria-label="願望清單"
              class="leading-none focus-visible:(outline-none rounded-full ring-2 ring-white/70)"
            >
              <div
                v-if="hasFavorites"
                class="i-material-symbols-favorite text-cc-accent h-6 w-6 cursor-pointer transition-transform duration-300 hover:scale-125"
              />
              <div
                v-else
                class="i-material-symbols-favorite-outline h-6 w-6 cursor-pointer transition-transform duration-300 hover:scale-125"
              />
            </NuxtLink>
          </div>

          <NuxtLink
            to="/login"
            class="text-base px-4 py-2 rounded-[50px] bg-cc-overlay gap-[6px] hidden whitespace-nowrap transition-colors duration-300 items-center justify-center hover:bg-cc-accent lg:flex"
          >
            <div class="i-material-symbols-person-outline shrink-0 h-6 w-6" />
            登入 / 註冊
          </NuxtLink>

          <NuxtLink
            to="/cart"
            aria-label="購物車"
            class="cursor-pointer relative focus-visible:(outline-none rounded ring-2 ring-white/70)"
          >
            <div class="i-material-symbols-shopping-cart-outline h-6 w-6" />
            <span
              v-if="cartCount > 0"
              class="text-[10px] text-white font-bold rounded-full bg-cc-accent flex h-4 w-4 items-center justify-center absolute -right-2 -top-2"
            >
              {{ cartCount > 10 ? "10+" : cartCount }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
