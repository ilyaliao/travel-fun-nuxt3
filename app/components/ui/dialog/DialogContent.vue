<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from 'radix-vue'
import { cn } from '~/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-cc-overlay inset-0 fixed z-50"
    />
    <DialogContent
      :class="
        cn(
          'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-cc-grey-e9 bg-white p-6 shadow-lg rounded-xl',
          props.class,
        )
      "
    >
      <slot />
      <DialogClose class="rounded-sm opacity-70 right-4 top-4 absolute hover:opacity-100">
        <div class="i-material-symbols-close h-4 w-4" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
