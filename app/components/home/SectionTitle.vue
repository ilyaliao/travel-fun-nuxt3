<script setup lang="ts">
defineProps<{
  title: string
  secTitle?: string
  page?: boolean
  headingLevel?: 'h2' | 'h3' | 'h4'
}>()
</script>

<template>
  <div class="flex gap-2 items-start" :class="page ? 'mb-5' : 'mb-6'">
    <div class="mt-2 bg-cc-primary h-2 w-2" />
    <div>
      <component :is="headingLevel || 'h3'" class="text-xl font-bold mb-2 md:text-[28px]">
        {{ title }}
      </component>
      <h6 v-if="secTitle" class="text-sm text-cc-grey-9f break-all md:text-base">
        {{ secTitle }}
      </h6>
    </div>
  </div>
</template>
