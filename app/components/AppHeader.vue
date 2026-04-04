<script setup lang="ts">
import { websiteConfig } from '~/config/website'

const route = useRoute()
const { fixedHeaderList } = useAppConfig() as any

const isFixed = computed(() => {
  const name = route.name as string
  return fixedHeaderList?.includes(name) ?? true
})
</script>

<template>
  <header
    class="w-full transition-colors top-0 z-40"
    :class="
      isFixed
        ? 'fixed bg-cc-black/30 text-white'
        : 'sticky bg-white text-cc-black border-b border-cc-grey-e9'
    "
  >
    <nav class="max-w-cc-big-width mx-auto px-4 flex h-16 items-center justify-between lg:px-8">
      <!-- Left: Logo + Nav -->
      <div class="flex gap-6 items-center">
        <NuxtLink to="/" class="flex gap-2 items-center">
          <NuxtImg :src="websiteConfig.logo" alt="旅遊趣" class="h-8" />
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="gap-4 hidden items-center lg:flex">
          <RegionDropdown />
          <NuxtLink to="/products" class="text-btn flex gap-1 items-center hover:opacity-80">
            <div class="i-material-symbols-confirmation-number-outline h-5 w-5" />
            景點套票
          </NuxtLink>
          <NuxtLink to="/tours" class="text-btn flex gap-1 items-center hover:opacity-80">
            <div class="i-material-symbols-hiking h-5 w-5" />
            觀光行程
          </NuxtLink>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex gap-3 items-center">
        <NuxtLink to="/wishlist" class="icon-btn" aria-label="收藏">
          <div class="i-material-symbols-favorite-outline h-5 w-5" />
        </NuxtLink>

        <DarkToggle />

        <NuxtLink to="/login" class="text-btn gap-1 hidden items-center hover:opacity-80 lg:flex">
          <div class="i-material-symbols-person-outline h-5 w-5" />
          登入／註冊
        </NuxtLink>

        <NuxtLink to="/cart" class="icon-btn relative" aria-label="購物車">
          <div class="i-material-symbols-shopping-cart-outline h-5 w-5" />
        </NuxtLink>

        <!-- Mobile Menu Trigger -->
        <MobileMenu class="lg:hidden" />
      </div>
    </nav>
  </header>
</template>
