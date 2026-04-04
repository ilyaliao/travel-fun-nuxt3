<script setup lang="ts">
import { AccordionHeader, AccordionTrigger } from 'radix-vue'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <AccordionHeader class="flex">
    <AccordionTrigger
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>span]:rotate-180',
          props.class,
        )
      "
    >
      <slot />
      <span
        class="i-material-symbols-expand-more shrink-0 h-4 w-4 transition-transform duration-200"
      />
    </AccordionTrigger>
  </AccordionHeader>
</template>
