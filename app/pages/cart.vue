<script setup lang="ts">
import { currency } from "~/utils/currency";

const { data, isLoading } = useCartQuery();
const deleteCartMutation = useDeleteCart();
const deleteAllMutation = useDeleteAllCarts();

const carts = computed(() => data.value?.data?.carts || []);
const total = computed(() => data.value?.data?.total || 0);
const finalTotal = computed(() => data.value?.data?.final_total || 0);

useSeoMeta({ title: "購物車" });
</script>

<template>
  <div class="mx-auto px-4 py-8 max-w-[1296px]">
    <UiBreadcrumb class="mb-6">
      <UiBreadcrumbItem>
        <NuxtLink to="/" class="hover:text-cc-primary"> 首頁 </NuxtLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <span class="text-cc-black">購物車</span>
      </UiBreadcrumbItem>
    </UiBreadcrumb>

    <h1 class="text-h3 mb-6">購物車</h1>

    <div v-if="isLoading" class="py-20 flex items-center justify-center">
      <div class="i-material-symbols-progress-activity text-cc-primary h-8 w-8 animate-spin" />
    </div>

    <template v-else-if="carts.length">
      <div class="gap-8 grid lg:grid-cols-3">
        <!-- Cart items -->
        <div class="flex flex-col gap-4 lg:col-span-2">
          <div class="flex justify-end">
            <button
              class="text-xs text-cc-grey-9f hover:text-cc-accent"
              @click="deleteAllMutation.mutate()"
            >
              清空購物車
            </button>
          </div>
          <div
            v-for="item in carts"
            :key="item.id"
            class="p-4 border border-cc-grey-e9 rounded-xl flex gap-4"
          >
            <NuxtImg
              v-if="item.product"
              :src="item.product.imageUrl"
              :alt="item.product.title"
              class="rounded-lg shrink-0 h-24 w-24 object-cover"
            />
            <div class="flex-1">
              <h3 class="text-body text-cc-black font-medium">
                {{ item.product?.title }}
              </h3>
              <p class="text-xs text-cc-grey-9f mt-1">數量：{{ item.qty }}</p>
              <p class="text-body text-cc-accent font-bold mt-1">
                {{ currency(item.total || 0) }}
              </p>
            </div>
            <button
              class="text-cc-grey-9f self-start hover:text-cc-accent"
              @click="deleteCartMutation.mutate(item.id!)"
            >
              <div class="i-material-symbols-close h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Summary -->
        <div class="p-6 border border-cc-grey-e9 rounded-xl h-fit">
          <h3 class="text-h5 mb-4">訂單摘要</h3>
          <div class="text-body mb-2 flex justify-between">
            <span class="text-cc-grey-66">小計</span>
            <span>{{ currency(total) }}</span>
          </div>
          <div class="my-3 bg-cc-grey-e9 h-px" />
          <div class="text-body font-bold flex justify-between">
            <span>總計</span>
            <span class="text-cc-accent">{{ currency(finalTotal) }}</span>
          </div>
          <NuxtLink to="/booking/order" class="btn mt-4 py-3 text-center w-full block">
            前往結帳
          </NuxtLink>
        </div>
      </div>
    </template>

    <UiEmpty v-else description="購物車是空的" />
  </div>
</template>
