<script setup lang="ts">
import type { New } from '~/types'

defineProps<New>()
</script>

<template>
  <div
    class="group text-white p-3 rounded-[10px] flex flex-col min-h-[240px] cursor-pointer transition-all duration-300 items-start justify-between relative overflow-hidden hover:brightness-[.8]"
  >
    <img
      :src="image"
      :alt="title"
      loading="lazy"
      class="h-full w-full inset-0 absolute object-cover -z-1"
    >
    <div class="text-sm text-white px-3 py-1 rounded-[30px] bg-cc-accent">
      最新消息
    </div>
    <div>
      <h4 class="text-lg font-bold">
        {{ title }}
      </h4>
      <p class="text-sm">
        {{ description }}
      </p>
      <button
        type="button"
        class="text-cc-black mt-2 px-4 py-2 rounded-[5px] bg-white cursor-pointer transition-colors duration-300 group-hover:(text-white bg-cc-primary) focus-visible:(outline-none ring-2 ring-cc-primary/50)"
      >
        查看更多
      </button>
    </div>
  </div>
</template>
