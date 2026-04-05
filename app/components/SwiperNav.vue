<script setup lang="ts">
defineProps<{
  classkey: string
  isBeginning: boolean
  isEnd: boolean
}>()
</script>

<template>
  <button
    aria-label="上一個"
    class="group text-cc-black rounded-full bg-white h-11 w-11 hidden cursor-pointer shadow-sm left-0 top-50% absolute z-10 focus-visible:(outline-none ring-2 ring-cc-primary/50) md:block -translate-x-full -translate-y-1/2"
    :class="[`swiper-${classkey}-custom-prev`, isBeginning && 'md:hidden']"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="text-cc-grey-d4 mx-auto h-6 w-6 transition-colors group-hover:text-cc-black"
    >
      <path
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  </button>
  <button
    aria-label="下一個"
    class="group text-cc-black rounded-full bg-white h-11 w-11 hidden cursor-pointer shadow-sm translate-x-full right-0 top-50% absolute z-10 focus-visible:(outline-none ring-2 ring-cc-primary/50) md:block -translate-y-1/2"
    :class="[`swiper-${classkey}-custom-next`, isEnd && 'md:hidden']"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="text-cc-grey-d4 mx-auto h-6 w-6 transition-colors group-hover:text-cc-black"
    >
      <path
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  </button>
</template>
