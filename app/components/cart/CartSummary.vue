<script setup lang="ts">
import { currency } from '~/utils/currency'

const cartStore = useCartStore()
</script>

<template>
  <div
    class="p-6 border border-l-3 border-cc-accent/15 border-l-cc-accent rounded-xl bg-cc-accent/3 h-fit"
  >
    <h3 class="text-h5 mb-4">
      訂單摘要
    </h3>
    <div class="text-body mb-2 flex justify-between">
      <span class="text-cc-grey-66">小計</span>
      <span>{{ currency(cartStore.subtotal) }}</span>
    </div>
    <div v-if="cartStore.coupon" class="text-body mb-2 flex justify-between">
      <span class="text-cc-grey-66">折扣 ({{ cartStore.coupon.title }})</span>
      <span class="text-cc-success">-{{ currency(cartStore.discountAmount) }}</span>
    </div>
    <div class="my-3 bg-cc-grey-e9 h-px" />
    <div class="text-body font-bold flex justify-between">
      <span>總計</span>
      <span class="text-cc-accent">{{ currency(cartStore.finalTotal) }}</span>
    </div>
    <slot />
  </div>
</template>
