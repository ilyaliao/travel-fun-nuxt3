<script setup lang="ts">
import { AccordionContent } from 'reka-ui'
import { cn } from '~/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <AccordionContent
    :class="
      cn(
        'overflow-hidden text-body data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        props.class,
      )
    "
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </AccordionContent>
</template>
