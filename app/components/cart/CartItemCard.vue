<script setup lang="ts">
import type { CartItem } from '~/types/cart'
import { currency } from '~/utils/currency'

const props = defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
  'update:qty': [qty: number]
  'remove': []
}>()

const unitPrice = computed(() => props.item.planPrice ?? props.item.product.price)
const lineTotal = computed(() => unitPrice.value * props.item.qty)
</script>

<template>
  <div class="p-4 border border-cc-grey-e9 rounded-xl bg-white flex gap-4">
    <NuxtImg
      :src="item.product.imageUrl"
      :alt="item.product.title"
      class="rounded-lg shrink-0 h-24 w-24 object-cover"
    />
    <div class="flex-1 min-w-0">
      <h3 class="text-body text-cc-black font-medium truncate">
        {{ item.product.title }}
      </h3>
      <p v-if="item.planTitle" class="text-xs text-cc-grey-9f mt-0.5">
        方案：{{ item.planTitle }}
      </p>
      <p v-if="item.buyDate" class="text-xs text-cc-grey-9f mt-0.5">
        日期：{{ item.buyDate }}
      </p>
      <p class="text-xs text-cc-grey-9f mt-0.5">
        {{ currency(unitPrice) }} / 件
      </p>
      <div class="mt-2 flex gap-3 items-center">
        <ProductQuantitySelector
          :model-value="item.qty"
          @update:model-value="emit('update:qty', $event)"
        />
        <span class="text-body text-cc-accent font-bold">
          {{ currency(lineTotal) }}
        </span>
      </div>
    </div>
    <button
      class="text-cc-grey-9f p-2 flex min-h-11 min-w-11 items-center self-start justify-center hover:text-cc-accent -m-2"
      aria-label="刪除此商品"
      @click="emit('remove')"
    >
      <div class="i-material-symbols-close h-5 w-5" />
    </button>
  </div>
</template>
