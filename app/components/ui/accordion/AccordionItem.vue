<script setup lang="ts">
import type { AccordionItemProps } from 'radix-vue'
import { AccordionItem } from 'radix-vue'
import { cn } from '~/lib/utils'

const props = defineProps<AccordionItemProps & { class?: string }>()
</script>

<template>
  <AccordionItem :class="cn('border-b border-cc-grey-e9', props.class)" :value="props.value">
    <slot />
  </AccordionItem>
</template>
