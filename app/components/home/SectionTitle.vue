<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-6">
    <h2 class="text-h4 text-cc-black lg:text-h3">
      <span class="text-cc-accent mr-1">•</span>{{ title }}
    </h2>
    <p v-if="subtitle" class="text-body text-cc-grey-66 mt-1">
      {{ subtitle }}
    </p>
  </div>
</template>
