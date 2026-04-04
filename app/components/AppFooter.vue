<script setup lang="ts">
import { websiteConfig } from '~/config/website'
</script>

<template>
  <footer class="px-4 py-8 bg-cc-black flex flex-col gap-6 items-center">
    <div class="flex gap-8 items-center">
      <img class="h-10 object-cover" :src="websiteConfig.logo" alt="Travel Fun 旅遊趣">
      <ul class="flex gap-4 items-center">
        <li
          v-for="item in websiteConfig.socia"
          :key="item.icon"
          class="text-white rounded-full bg-cc-grey-66 grid h-11 w-11 cursor-pointer transition-colors duration-300 place-items-center hover:bg-cc-accent"
        >
          <a
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="item.icon"
            class="focus-visible:(outline-none rounded-full ring-2 ring-white/70)"
          >
            <img :src="`/icons/${item.icon}.svg`" :alt="item.icon">
          </a>
        </li>
      </ul>
    </div>
    <p class="text-sm text-cc-grey-66 text-center">
      此網站僅做為前端 Side Project 作品練習，不做商業用途，請勿用於商業用途，謝謝！
    </p>
  </footer>
</template>
