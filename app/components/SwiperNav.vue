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
    class="swiper-btn swiper-btn-shadow group hidden left-0 focus-visible:(outline-none ring-2 ring-cc-primary/50) md:block -translate-x-full -translate-y-1/2"
    :class="[`swiper-${classkey}-custom-prev`, isBeginning && 'md:hidden']"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="text-cc-grey-d4 mx-auto h-6 w-6 transition-colors group-hover:text-[#32303C]"
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
    class="swiper-btn swiper-btn-shadow group hidden translate-x-full right-0 focus-visible:(outline-none ring-2 ring-cc-primary/50) md:block -translate-y-1/2"
    :class="[`swiper-${classkey}-custom-next`, isEnd && 'md:hidden']"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="text-cc-grey-d4 mx-auto h-6 w-6 transition-colors group-hover:text-[#32303C]"
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

<style scoped>
.swiper-btn {
  position: absolute;
  top: 50%;
  z-index: 10;
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 9999px;
  background: white;
  color: #32302c;
  cursor: pointer;
}

.swiper-btn-shadow {
  box-shadow: 0px 0px 4px 0px #0000001f;
}
</style>
