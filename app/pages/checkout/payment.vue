<script setup lang="ts">
import type { PaymentMethod } from '~/types/cart'
import { currency } from '~/utils/currency'

const route = useRoute()
const orderStore = useOrderStore()

const orderId = computed(() => route.query.order as string)
const order = computed(() => (orderId.value ? orderStore.getOrderById(orderId.value) : undefined))

if (import.meta.client) {
  watchEffect(() => {
    if (!orderId.value || !order.value) {
      navigateTo('/cart')
    }
    else if (order.value.isPaid) {
      navigateTo(`/checkout/done/${order.value.id}`)
    }
  })
}

const paymentMethod = ref<PaymentMethod>('credit-card')
const isProcessing = ref(false)

async function handlePay() {
  if (!order.value)
    return
  isProcessing.value = true
  orderStore.setPaymentMethod(order.value.id, paymentMethod.value)
  await new Promise(resolve => setTimeout(resolve, 1500))
  orderStore.markPaid(order.value.id)
  isProcessing.value = false
  navigateTo(`/checkout/done/${order.value.id}`)
}

useSeoMeta({ title: '付款' })
</script>

<template>
  <div v-if="order" class="bg-cc-grey-f7 min-h-[60vh]">
    <div class="mx-auto px-4 py-8 max-w-[1296px]">
      <UiBreadcrumb class="mb-4">
        <UiBreadcrumbItem>
          <NuxtLink to="/" class="hover:text-cc-primary">
            首頁
          </NuxtLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <NuxtLink to="/cart" class="hover:text-cc-primary">
            購物車
          </NuxtLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <span class="text-cc-black">付款</span>
        </UiBreadcrumbItem>
      </UiBreadcrumb>

      <h1 class="text-h3 mb-2">
        付款
      </h1>

      <CheckoutStepIndicator :current-step="2" />

      <div class="gap-8 grid lg:grid-cols-3">
        <div class="flex flex-col gap-6 lg:col-span-2">
          <div class="p-6 border border-cc-grey-e9 rounded-xl bg-white">
            <CheckoutPaymentMethodPicker v-model="paymentMethod" />
          </div>

          <div class="p-6 border border-cc-grey-e9 rounded-xl bg-white">
            <CheckoutCreditCardForm v-if="paymentMethod === 'credit-card'" />

            <div v-else-if="paymentMethod === 'atm'">
              <h4 class="text-body font-medium mb-3">
                ATM 轉帳資訊
              </h4>
              <div class="text-body text-cc-grey-66 flex flex-col gap-1.5">
                <p>銀行代碼：012</p>
                <p>帳號：1234-5678-9012-3456</p>
                <p>
                  繳款期限：{{ new Date(Date.now() + 3 * 86400000).toLocaleDateString("zh-TW") }}
                </p>
              </div>
              <p class="text-xs text-cc-grey-9f mt-3">
                此為模擬付款，不會產生實際扣款
              </p>
            </div>

            <div
              v-else-if="paymentMethod === 'line-pay'"
              class="py-4 flex flex-col gap-3 items-center"
            >
              <div class="i-material-symbols-phone-android text-cc-line-pay h-12 w-12" />
              <p class="text-body font-medium">
                LINE Pay
              </p>
              <p class="text-xs text-cc-grey-9f">
                點擊付款後將模擬 LINE Pay 付款流程
              </p>
            </div>
          </div>

          <button class="btn text-base py-3.5 w-full" :disabled="isProcessing" @click="handlePay">
            確認付款 {{ currency(order.total) }}
          </button>
          <p
            class="text-xs text-cc-grey-9f mt-2 text-center flex gap-1 items-center justify-center"
          >
            <span class="i-material-symbols-lock h-3.5 w-3.5" />
            付款資訊以 SSL 加密保護
          </p>
        </div>

        <div class="lg:self-start lg:top-24 lg:sticky">
          <CheckoutOrderSummary
            :items="order.items"
            :coupon="order.coupon"
            :subtotal="order.subtotal"
            :discount-amount="order.discountAmount"
            :total="order.total"
          />
        </div>
      </div>

      <CheckoutPaymentProcessing :visible="isProcessing" />
    </div>
  </div>
</template>
