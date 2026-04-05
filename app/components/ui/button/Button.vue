<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'
import { Primitive } from 'reka-ui'
import { cn } from '~/lib/utils'

const { as = 'button', variant, size, class: className } = defineProps<Props>()

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[5px] text-btn font-medium transition-colors focus-visible:(outline-none ring-2 ring-cc-primary ring-offset-2) disabled:(pointer-events-none opacity-50)',
  {
    variants: {
      variant: {
        default: 'bg-cc-accent text-white hover:bg-cc-accent/90',
        primary: 'bg-cc-primary text-white hover:bg-cc-primary/90',
        destructive: 'bg-cc-accent text-white hover:bg-cc-accent/90',
        outline: 'border border-cc-grey-d4 bg-white hover:bg-cc-grey-f7 text-cc-black',
        ghost: 'hover:bg-cc-grey-f7 text-cc-black',
        link: 'text-cc-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-[5px] px-3',
        lg: 'h-11 rounded-[5px] px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>

interface Props {
  variant?: NonNullable<ButtonVariants['variant']>
  size?: NonNullable<ButtonVariants['size']>
  as?: string
  class?: HTMLAttributes['class']
}
</script>

<template>
  <Primitive :as :class="cn(buttonVariants({ variant, size }), className)">
    <slot />
  </Primitive>
</template>
