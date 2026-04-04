<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  modelValue?: string
  options: { label: string, value: string }[]
  placeholder?: string
  class?: HTMLAttributes['class']
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <select
    :value="modelValue"
    :class="
      cn(
        'flex h-10 w-full items-center justify-between rounded-[5px] border border-cc-grey-d4 bg-white px-3 py-2 text-body ring-offset-white placeholder:text-cc-grey-9f focus:(outline-none ring-2 ring-cc-primary ring-offset-2) disabled:(cursor-not-allowed opacity-50)',
        props.class,
      )
    "
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option v-if="placeholder" value="" disabled>
      {{ placeholder }}
    </option>
    <option v-for="opt in options" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>
