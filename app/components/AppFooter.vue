<script setup lang="ts">
import { websiteConfig } from '~/config/website'
import { copyRight } from '~/constants'

const iconMap: Record<string, string> = {
  github: 'i-carbon-logo-github',
  mail: 'i-material-symbols-mail-outline',
  public: 'i-material-symbols-home-outline',
}
</script>

<template>
  <footer class="text-white bg-cc-black">
    <div class="max-w-cc-width mx-auto px-4 py-8 flex flex-col gap-4 items-center">
      <!-- Logo + Social -->
      <div class="flex gap-4 items-center">
        <NuxtImg :src="websiteConfig.logo" alt="旅遊趣" class="h-8" />

        <a
          v-for="item in websiteConfig.socia"
          :key="item.icon"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          class="icon-btn text-white/70 hover:text-white"
        >
          <div class="h-6 w-6" :class="iconMap[item.icon] || 'i-carbon-link'" />
        </a>
      </div>

      <!-- Copyright -->
      <p class="text-xs text-white/50 text-center">
        {{ copyRight }}
      </p>
    </div>
  </footer>
</template>
