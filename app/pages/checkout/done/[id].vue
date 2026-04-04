<script setup lang="ts">
import { toast } from 'vue-sonner'
import { currency } from '~/utils/currency'

const route = useRoute()
const orderStore = useOrderStore()

function copyOrderId(id: string) {
  const short = id.slice(0, 8).toUpperCase()
  navigator.clipboard.writeText(short)
  toast.success('已複製訂單編號')
}

const orderId = computed(() => route.params.id as string)
const order = computed(() => orderStore.getOrderById(orderId.value))

onMounted(() => {
  if (!order.value) {
    navigateTo('/')
  }
})

const paymentLabels: Record<string, string> = {
  'credit-card': '信用卡',
  'atm': 'ATM 轉帳',
  'line-pay': 'LINE Pay',
}

useSeoMeta({ title: '訂單完成' })
</script>

<template>
  <div v-if="order" class="bg-cc-grey-f7 min-h-[60vh]">
    <div class="mx-auto px-4 py-8 max-w-[1296px]">
      <CheckoutStepIndicator :current-step="3" />

      <div class="mx-auto max-w-2xl">
        <div class="mb-8 px-6 py-8 text-center rounded-2xl bg-cc-success-light">
          <div class="p-4 rounded-full bg-cc-success/12 inline-flex">
            <div class="i-material-symbols-check-circle text-cc-success h-14 w-14" />
          </div>
          <h1 class="text-h3 text-cc-success mt-4">
            訂單已完成！
          </h1>
          <p class="text-body text-cc-grey-66 mt-2">
            感謝您的購買，期待您的旅程！
          </p>
        </div>

        <div class="mb-6 p-6 border border-cc-grey-e9 rounded-xl bg-white">
          <div class="mb-5 flex items-center justify-between">
            <h3 class="text-h5">
              訂單資訊
            </h3>
            <span
              class="text-xs text-cc-success font-medium px-2.5 py-1 rounded-full bg-cc-success-light"
            >已付款</span>
          </div>

          <div class="mb-5 flex flex-col gap-3">
            <div v-for="item in order.items" :key="item.id" class="flex gap-3 items-center">
              <NuxtImg
                :src="item.product.imageUrl"
                :alt="item.product.title"
                class="rounded-lg shrink-0 h-14 w-14 object-cover"
              />
              <div class="flex-1 min-w-0">
                <p class="text-body text-cc-black truncate">
                  {{ item.product.title }}
                </p>
                <p v-if="item.planTitle" class="text-xs text-cc-grey-9f">
                  {{ item.planTitle }}
                </p>
              </div>
              <span class="text-body font-medium shrink-0">x{{ item.qty }}</span>
            </div>
          </div>

          <div class="bg-cc-grey-e9 h-px" />

          <div class="text-body mt-4 flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <span class="text-cc-grey-66">訂單編號</span>
              <button
                class="text-sm font-medium font-mono px-2 py-0.5 rounded bg-cc-grey-f7 flex gap-1 transition-colors items-center hover:bg-cc-grey-e9"
                @click="copyOrderId(order.id)"
              >
                {{ order.id.slice(0, 8).toUpperCase() }}
                <span class="i-material-symbols-content-copy text-cc-grey-9f h-3.5 w-3.5" />
              </button>
            </div>
            <div class="flex justify-between">
              <span class="text-cc-grey-66">訂購人</span>
              <span>{{ order.user.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-cc-grey-66">付款方式</span>
              <span>{{ paymentLabels[order.paymentMethod] }}</span>
            </div>
            <div class="my-1 bg-cc-grey-e9 h-px" />
            <div class="text-base font-bold flex justify-between">
              <span>總計</span>
              <span class="text-cc-accent">{{ currency(order.total) }}</span>
            </div>
          </div>

          <p class="text-xs text-cc-grey-9f mt-4 text-center">
            請記下訂單編號，可於「查詢訂單」頁面查看訂單狀態
          </p>
        </div>

        <div class="flex gap-4">
          <NuxtLink to="/orders" class="btn-primary py-3 text-center flex-1 block">
            查詢訂單
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="text-btn text-cc-accent py-3 text-center border border-cc-accent rounded-[5px] flex-1 block transition-colors hover:bg-cc-accent/5"
          >
            繼續探索
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
