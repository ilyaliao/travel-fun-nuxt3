<script setup lang="ts">
const {
  value,
  max = 5,
  count,
} = defineProps<{
  value: number
  max?: number
  count?: number
}>()

const fullStars = computed(() => Math.floor(value))
const hasHalf = computed(() => value - fullStars.value >= 0.25)
</script>

<template>
  <div class="inline-flex gap-0.5 items-center tabular-nums">
    <template v-for="i in max" :key="i">
      <div
        class="h-4 w-4"
        :class="
          i <= fullStars
            ? 'i-material-symbols-star text-cc-accent'
            : i === fullStars + 1 && hasHalf
              ? 'i-material-symbols-star-half text-cc-accent'
              : 'i-material-symbols-star-outline text-cc-grey-d4'
        "
      />
    </template>
    <span v-if="value" class="text-sm text-cc-accent ml-1">{{ value.toFixed(1) }}</span>
    <span v-if="count !== undefined" class="text-sm text-cc-grey-66">({{ count }})</span>
  </div>
</template>
