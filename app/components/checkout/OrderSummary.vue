<script setup lang="ts">
import type { AppliedCoupon, CartItem } from '~/types/cart'
import { currency } from '~/utils/currency'

defineProps<{
  items: CartItem[]
  coupon: AppliedCoupon | null
  subtotal: number
  discountAmount: number
  total: number
}>()
</script>

<template>
  <div
    class="p-6 border border-l-3 border-cc-accent/15 border-l-cc-accent rounded-xl bg-cc-accent/3"
  >
    <h3 class="text-h5 mb-4">
      訂單明細
    </h3>
    <div class="flex flex-col gap-3">
      <div v-for="item in items" :key="item.id" class="flex gap-3">
        <NuxtImg
          :src="item.product.imageUrl"
          :alt="item.product.title"
          class="rounded-lg shrink-0 h-16 w-16 object-cover"
        />
        <div class="flex-1 min-w-0">
          <p class="text-body text-cc-black truncate">
            {{ item.product.title }}
          </p>
          <p v-if="item.planTitle" class="text-xs text-cc-grey-9f">
            {{ item.planTitle }}
          </p>
          <p v-if="item.buyDate" class="text-xs text-cc-grey-9f">
            {{ item.buyDate }}
          </p>
        </div>
        <div class="text-right shrink-0">
          <p class="text-body font-medium">
            {{ currency((item.planPrice ?? item.product.price) * item.qty) }}
          </p>
          <p class="text-xs text-cc-grey-9f">
            x{{ item.qty }}
          </p>
        </div>
      </div>
    </div>
    <div class="my-4 bg-cc-grey-e9 h-px" />
    <div class="text-body mb-1 flex justify-between">
      <span class="text-cc-grey-66">小計</span>
      <span>{{ currency(subtotal) }}</span>
    </div>
    <div v-if="coupon" class="text-body mb-1 flex justify-between">
      <span class="text-cc-grey-66">折扣 ({{ coupon.title }})</span>
      <span class="text-cc-success">-{{ currency(discountAmount) }}</span>
    </div>
    <div class="my-3 bg-cc-grey-e9 h-px" />
    <div class="text-body font-bold flex justify-between">
      <span>總計</span>
      <span class="text-cc-accent">{{ currency(total) }}</span>
    </div>
  </div>
</template>
