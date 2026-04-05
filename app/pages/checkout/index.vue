<script setup lang="ts">
const cartStore = useCartStore()
const orderStore = useOrderStore()

onMounted(() => {
  if (cartStore.isEmpty) {
    navigateTo('/cart')
  }
})

const isSubmitting = ref(false)

function handleSubmit(data: {
  name: string
  email: string
  tel: string
  address: string
  message: string
}) {
  isSubmitting.value = true
  try {
    const orderId = orderStore.createOrder(
      { name: data.name, email: data.email, tel: data.tel, address: data.address },
      data.message,
      'credit-card',
      cartStore.items,
      cartStore.coupon,
      cartStore.subtotal,
      cartStore.discountAmount,
      cartStore.finalTotal,
    )
    cartStore.clearCart()
    navigateTo(`/checkout/payment?order=${orderId}`)
  }
  catch {
    isSubmitting.value = false
  }
}

useSeoMeta({ title: '結帳' })
</script>

<template>
  <div class="bg-cc-grey-f7 min-h-[60vh]">
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
          <span class="text-cc-black">結帳</span>
        </UiBreadcrumbItem>
      </UiBreadcrumb>

      <h1 class="text-h3 mb-2">
        結帳
      </h1>

      <CheckoutStepIndicator :current-step="1" />

      <div class="gap-8 grid lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="p-6 border border-cc-grey-e9 rounded-xl bg-white">
            <h2 class="text-h5 mb-5">
              聯絡資訊
            </h2>
            <CheckoutForm :is-submitting="isSubmitting" @submit="handleSubmit" />
          </div>
        </div>
        <div class="lg:self-start lg:top-24 lg:sticky">
          <ClientOnly>
            <CheckoutOrderSummary
              :items="cartStore.items"
              :coupon="cartStore.coupon"
              :subtotal="cartStore.subtotal"
              :discount-amount="cartStore.discountAmount"
              :total="cartStore.finalTotal"
            />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>
