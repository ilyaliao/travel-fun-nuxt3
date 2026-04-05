<script setup lang="ts">
import type { PopoverContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { PopoverContent, PopoverPortal } from 'reka-ui'
import { cn } from '~/lib/utils'

interface Props extends PopoverContentProps {
  class?: HTMLAttributes['class']
}

const { align = 'center', sideOffset = 4, class: className } = defineProps<Props>()
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      :class="
        cn(
          'z-50 w-72 rounded-xl border border-cc-grey-e9 bg-white p-4 shadow-md outline-none',
          className,
        )
      "
      :align
      :side-offset="sideOffset"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
