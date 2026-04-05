<script setup lang="ts">
const { min = 1, max = 99 } = defineProps<{
  min?: number
  max?: number
}>()
const model = defineModel<number>({ required: true })
function decrement() {
  if (model.value > min)
    model.value--
}

function increment() {
  if (model.value < max)
    model.value++
}
</script>

<template>
  <div class="border border-cc-grey-d4 rounded-xl inline-flex items-center">
    <button
      type="button"
      class="rounded-l-xl inline-flex h-10 w-10 transition-colors items-center justify-center hover:bg-cc-grey-f7 disabled:(opacity-40 pointer-events-none)"
      :disabled="model <= min"
      aria-label="減少數量"
      @click="decrement"
    >
      <div class="i-material-symbols-remove h-5 w-5" />
    </button>
    <span class="text-body font-semibold text-center min-w-10 select-none tabular-nums">{{
      model
    }}</span>
    <button
      type="button"
      class="rounded-r-xl inline-flex h-10 w-10 transition-colors items-center justify-center hover:bg-cc-grey-f7 disabled:(opacity-40 pointer-events-none)"
      :disabled="model >= max"
      aria-label="增加數量"
      @click="increment"
    >
      <div class="i-material-symbols-add h-5 w-5" />
    </button>
  </div>
</template>
