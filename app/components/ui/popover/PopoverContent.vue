<script setup lang="ts">
import type { PopoverContentProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import { PopoverContent, PopoverPortal } from 'radix-vue'
import { cn } from '~/lib/utils'

interface Props extends PopoverContentProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  sideOffset: 4,
})
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      :class="
        cn(
          'z-50 w-72 rounded-xl border border-cc-grey-e9 bg-white p-4 shadow-md outline-none',
          props.class,
        )
      "
      :align="align"
      :side-offset="sideOffset"
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>
