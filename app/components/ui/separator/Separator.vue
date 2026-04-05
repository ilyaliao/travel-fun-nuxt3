<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const { orientation = 'horizontal', class: className } = defineProps<{
  orientation?: 'horizontal' | 'vertical'
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    role="separator"
    :class="
      cn(
        'shrink-0 bg-cc-grey-e9',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )
    "
  />
</template>
