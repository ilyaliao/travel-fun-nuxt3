<script setup lang="ts">
import type { PaymentMethod } from '~/types/cart'

const model = defineModel<PaymentMethod>({ default: 'credit-card' })

const methods = [
  { value: 'credit-card' as const, label: '信用卡', icon: 'i-material-symbols-credit-card' },
  { value: 'atm' as const, label: 'ATM 轉帳', icon: 'i-material-symbols-account-balance' },
  { value: 'line-pay' as const, label: 'LINE Pay', icon: 'i-material-symbols-phone-android' },
]
</script>

<template>
  <div class="flex flex-col gap-3">
    <h3 class="text-h5">
      選擇付款方式
    </h3>
    <div class="gap-3 grid grid-cols-1 sm:grid-cols-3">
      <button
        v-for="method in methods"
        :key="method.value"
        type="button"
        class="p-4 border rounded-xl flex flex-row gap-2 transition-colors items-center sm:flex-col"
        :class="
          model === method.value
            ? 'border-cc-accent bg-cc-accent/5 text-cc-accent'
            : 'border-cc-grey-e9 hover:border-cc-grey-d4'
        "
        @click="model = method.value"
      >
        <div :class="method.icon" class="h-6 w-6" />
        <span class="text-body text-xs">{{ method.label }}</span>
      </button>
    </div>
  </div>
</template>
