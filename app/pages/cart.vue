<script setup lang="ts">
import type { CartItem } from '~/types/cart'
import { toast } from 'vue-sonner'

const cartStore = useCartStore()

function handleClearCart() {
  const backup = structuredClone(toRaw(cartStore.items)) as CartItem[]
  cartStore.clearCart()
  toast('已清空購物車', {
    action: {
      label: '復原',
      onClick: () => {
        cartStore.items.push(...backup)
      },
    },
    duration: 5000,
  })
}

useSeoMeta({ title: '購物車' })
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
          <span class="text-cc-black">購物車</span>
        </UiBreadcrumbItem>
      </UiBreadcrumb>

      <div class="mb-6 flex items-baseline justify-between">
        <h1 class="text-h3">
          購物車
        </h1>
        <ClientOnly>
          <span v-if="!cartStore.isEmpty" class="text-body text-cc-grey-66">
            共 {{ cartStore.totalItems }} 件商品
          </span>
        </ClientOnly>
      </div>

      <ClientOnly>
        <template v-if="!cartStore.isEmpty">
          <div class="gap-8 grid lg:grid-cols-3">
            <div class="flex flex-col gap-4 lg:col-span-2">
              <div class="flex items-center justify-between">
                <NuxtLink
                  to="/products"
                  class="text-body text-cc-primary flex gap-1 items-center hover:underline"
                >
                  <div class="i-material-symbols-arrow-back h-4 w-4" />
                  繼續購物
                </NuxtLink>
                <button
                  class="text-body text-cc-grey-9f px-3 py-1.5 rounded-lg flex gap-1 transition-colors items-center hover:(text-cc-accent bg-red-50)"
                  @click="handleClearCart"
                >
                  <span class="i-material-symbols-delete-outline h-4 w-4" />
                  清空購物車
                </button>
              </div>
              <CartItemCard
                v-for="item in cartStore.items"
                :key="item.id"
                :item
                @update:qty="cartStore.updateQty(item.id, $event)"
                @remove="cartStore.removeItem(item.id)"
              />
              <CartCouponInput class="mt-2" />
            </div>

            <div class="lg:self-start lg:top-24 lg:sticky">
              <CartSummary>
                <NuxtLink to="/checkout" class="btn mt-4 py-3 text-center w-full block">
                  前往結帳
                </NuxtLink>
              </CartSummary>
            </div>
          </div>
        </template>

        <div v-else class="py-20 flex flex-col gap-6 items-center">
          <div class="p-5 rounded-full bg-cc-accent/8">
            <div class="i-material-symbols-shopping-cart-outline text-cc-accent h-16 w-16" />
          </div>
          <div class="text-center">
            <p class="text-h5 text-cc-black mb-2">
              購物車是空的
            </p>
            <p class="text-body text-cc-grey-9f">
              去看看有什麼好玩的景點吧！
            </p>
          </div>
          <NuxtLink to="/products" class="btn px-8 py-3">
            探索景點
          </NuxtLink>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
