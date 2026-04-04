<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <nav :class="cn('flex', props.class)" aria-label="breadcrumb">
    <ol class="text-body text-cc-grey-9f flex gap-1.5 items-center">
      <slot />
    </ol>
  </nav>
</template>
