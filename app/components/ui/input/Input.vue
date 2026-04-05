<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const { class: className } = defineProps<{
  class?: HTMLAttributes['class']
}>()
const model = defineModel<string | number>()
</script>

<template>
  <input
    v-model="model"
    :class="
      cn(
        'flex h-10 w-full rounded-[5px] border border-cc-grey-d4 bg-white px-3 py-2 text-body ring-offset-white file:(border-0 bg-transparent text-sm font-medium) placeholder:text-cc-grey-9f focus-visible:(outline-none ring-2 ring-cc-primary ring-offset-2) disabled:(cursor-not-allowed opacity-50)',
        className,
      )
    "
  >
</template>
