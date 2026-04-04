<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const props = defineProps<{
  variant?: NonNullable<BadgeVariants['variant']>
  class?: HTMLAttributes['class']
}>()

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-cc-accent text-white',
        secondary: 'border-transparent bg-cc-grey-e9 text-cc-black',
        outline: 'border-cc-grey-d4 text-cc-black',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type BadgeVariants = VariantProps<typeof badgeVariants>
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
