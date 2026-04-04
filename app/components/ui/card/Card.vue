<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="cn('rounded-xl border border-cc-grey-e9 bg-white text-cc-black shadow-sm', props.class)"
  >
    <slot />
  </div>
</template>
