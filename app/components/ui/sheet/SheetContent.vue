<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from 'reka-ui'
import { cn } from '~/lib/utils'

interface Props {
  side?: 'top' | 'right' | 'bottom' | 'left'
  class?: HTMLAttributes['class']
}

const { side = 'right', class: className } = defineProps<Props>()

const sideClasses: Record<string, string> = {
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t',
  left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
  right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
}
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="bg-cc-overlay inset-0 fixed z-50" />
    <DialogContent
      :class="
        cn(
          'fixed z-50 gap-4 bg-white p-6 shadow-lg transition-transform',
          sideClasses[side],
          className,
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
