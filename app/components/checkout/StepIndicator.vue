<script setup lang="ts">
defineProps<{
  currentStep: 1 | 2 | 3
}>()

const steps = [
  { num: 1, label: '填寫資料' },
  { num: 2, label: '確認付款' },
  { num: 3, label: '完成訂單' },
]
</script>

<template>
  <nav aria-label="結帳步驟" class="mb-8">
    <ol class="flex items-center">
      <template v-for="(step, i) in steps" :key="step.num">
        <li
          class="flex gap-2 items-center"
          :aria-current="step.num === currentStep ? 'step' : undefined"
        >
          <div
            class="text-sm font-bold rounded-full flex shrink-0 h-8 w-8 transition-colors items-center justify-center"
            :class="
              step.num < currentStep
                ? 'bg-cc-accent text-white'
                : step.num === currentStep
                  ? 'bg-cc-accent text-white ring-4 ring-cc-accent/20'
                  : 'bg-cc-grey-e9 text-cc-grey-9f'
            "
          >
            <div v-if="step.num < currentStep" class="i-material-symbols-check h-5 w-5" />
            <span v-else>{{ step.num }}</span>
          </div>
          <span
            class="text-body font-medium"
            :class="[
              step.num <= currentStep ? 'text-cc-black' : 'text-cc-grey-9f',
              step.num === currentStep ? 'inline' : 'hidden sm:inline',
            ]"
          >
            {{ step.label }}
          </span>
        </li>
        <div
          v-if="i < steps.length - 1"
          class="mx-3 flex-1 h-px sm:mx-4"
          :class="step.num < currentStep ? 'bg-cc-accent' : 'bg-cc-grey-e9'"
        />
      </template>
    </ol>
  </nav>
</template>
