<script setup lang="ts">
const { description = '目前沒有資料' } = defineProps<{
  description?: string
}>()
</script>

<template>
  <div class="text-cc-grey-9f py-12 flex flex-col items-center justify-center">
    <div class="i-material-symbols-inbox-outline mb-3 h-12 w-12" />
    <p class="text-body">
      {{ description }}
    </p>
    <slot />
  </div>
</template>
