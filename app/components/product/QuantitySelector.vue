<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
  }>(),
  {
    min: 1,
    max: 99,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function decrement() {
  if (props.modelValue > props.min)
    emit('update:modelValue', props.modelValue - 1)
}

function increment() {
  if (props.modelValue < props.max)
    emit('update:modelValue', props.modelValue + 1)
}
</script>

<template>
  <div class="border border-cc-grey-d4 rounded-xl inline-flex items-center">
    <button
      type="button"
      class="rounded-l-xl inline-flex h-10 w-10 transition-colors items-center justify-center hover:bg-cc-grey-f7 disabled:(opacity-40 pointer-events-none)"
      :disabled="modelValue <= min"
      aria-label="減少數量"
      @click="decrement"
    >
      <div class="i-material-symbols-remove h-5 w-5" />
    </button>
    <span class="text-body font-semibold text-center min-w-10 select-none tabular-nums">{{
      modelValue
    }}</span>
    <button
      type="button"
      class="rounded-r-xl inline-flex h-10 w-10 transition-colors items-center justify-center hover:bg-cc-grey-f7 disabled:(opacity-40 pointer-events-none)"
      :disabled="modelValue >= max"
      aria-label="增加數量"
      @click="increment"
    >
      <div class="i-material-symbols-add h-5 w-5" />
    </button>
  </div>
</template>
