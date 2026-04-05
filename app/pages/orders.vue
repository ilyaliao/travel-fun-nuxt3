<script setup lang="ts">
import { toast } from 'vue-sonner'
import { currency } from '~/utils/currency'

const orderStore = useOrderStore()

function copyOrderId(id: string) {
  const short = id.slice(0, 8).toUpperCase()
  navigator.clipboard.writeText(short)
  toast.success('已複製訂單編號')
}
const searchId = ref('')
const searchResult = ref<ReturnType<typeof orderStore.getOrderById>>()
const hasSearched = ref(false)

const paymentLabels: Record<string, string> = {
  'credit-card': '信用卡',
  'atm': 'ATM 轉帳',
  'line-pay': 'LINE Pay',
}

function handleSearch() {
  if (!searchId.value.trim())
    return
  hasSearched.value = true
  const query = searchId.value.trim().toLowerCase()
  searchResult.value = orderStore.orders.find(
    o => o.id === query || o.id.slice(0, 8).toLowerCase() === query,
  )
}

useSeoMeta({ title: '查詢訂單' })
</script>

<template>
  <div class="bg-cc-grey-f7 min-h-[60vh]">
    <div class="mx-auto px-4 py-8 max-w-2xl">
      <UiBreadcrumb class="mb-4">
        <UiBreadcrumbItem>
          <NuxtLink to="/" class="hover:text-cc-primary">
            首頁
          </NuxtLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <span class="text-cc-black">查詢訂單</span>
        </UiBreadcrumbItem>
      </UiBreadcrumb>

      <h1 class="text-h3 mb-2">
        查詢訂單
      </h1>
      <p class="text-body text-cc-grey-66 mb-6">
        輸入訂單完成時顯示的編號，即可查看訂單狀態
      </p>

      <form
        class="mb-8 p-5 border border-cc-grey-e9 rounded-xl bg-white"
        @submit.prevent="handleSearch"
      >
        <label class="text-body text-cc-black font-medium mb-2 block">訂單編號</label>
        <div class="flex gap-2">
          <UiInput v-model="searchId" placeholder="例如：97C707B7" class="font-mono flex-1" />
          <button type="submit" class="btn px-6 shrink-0" :disabled="!searchId.trim()">
            查詢
          </button>
        </div>
      </form>

      <template v-if="hasSearched">
        <div v-if="searchResult" class="p-6 border border-cc-grey-e9 rounded-xl bg-white">
          <div class="mb-5 flex items-center justify-between">
            <h3 class="text-h5">
              訂單詳情
            </h3>
            <span
              class="text-xs font-medium px-2.5 py-1 rounded-full"
              :class="
                searchResult.isPaid
                  ? 'bg-cc-success-light text-cc-success'
                  : 'bg-cc-warning-light text-cc-warning'
              "
            >
              {{ searchResult.isPaid ? "已付款" : "未付款" }}
            </span>
          </div>

          <div class="text-body mb-5 flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <span class="text-cc-grey-66">訂單編號</span>
              <button
                class="text-sm font-medium font-mono px-2 py-0.5 rounded bg-cc-grey-f7 flex gap-1 transition-colors items-center hover:bg-cc-grey-e9"
                @click="copyOrderId(searchResult.id)"
              >
                {{ searchResult.id.slice(0, 8).toUpperCase() }}
                <span class="i-material-symbols-content-copy text-cc-grey-9f h-3.5 w-3.5" />
              </button>
            </div>
            <div class="flex justify-between">
              <span class="text-cc-grey-66">訂購人</span>
              <span>{{ searchResult.user.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-cc-grey-66">付款方式</span>
              <span>{{ paymentLabels[searchResult.paymentMethod] }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-cc-grey-66">建立時間</span>
              <span>{{ new Date(searchResult.createdAt).toLocaleString("zh-TW") }}</span>
            </div>
          </div>

          <div class="bg-cc-grey-e9 h-px" />

          <h4 class="text-body font-medium mb-3 mt-5">
            購買商品
          </h4>
          <div class="flex flex-col gap-3">
            <div v-for="item in searchResult.items" :key="item.id" class="flex gap-3 items-center">
              <NuxtImg
                :src="item.product.imageUrl"
                :alt="item.product.title"
                class="rounded-lg shrink-0 h-14 w-14 object-cover"
              />
              <div class="flex-1 min-w-0">
                <p class="text-body truncate">
                  {{ item.product.title }}
                </p>
                <p v-if="item.planTitle" class="text-xs text-cc-grey-9f">
                  {{ item.planTitle }}
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

          <div class="my-5 bg-cc-grey-e9 h-px" />

          <div class="text-body flex flex-col gap-1.5">
            <div class="flex justify-between">
              <span class="text-cc-grey-66">小計</span>
              <span>{{ currency(searchResult.subtotal) }}</span>
            </div>
            <div v-if="searchResult.coupon" class="flex justify-between">
              <span class="text-cc-grey-66">折扣 ({{ searchResult.coupon.title }})</span>
              <span class="text-cc-success">-{{ currency(searchResult.discountAmount) }}</span>
            </div>
            <div class="my-1.5 bg-cc-grey-e9 h-px" />
            <div class="text-base font-bold flex justify-between">
              <span>總計</span>
              <span class="text-cc-accent">{{ currency(searchResult.total) }}</span>
            </div>
          </div>
        </div>

        <div v-else class="py-16 flex flex-col gap-4 items-center">
          <div class="p-4 rounded-full bg-cc-warning-light">
            <div class="i-material-symbols-search-off text-cc-warning h-12 w-12" />
          </div>
          <div class="text-center">
            <p class="text-h5 text-cc-black mb-1">
              找不到此訂單
            </p>
            <p class="text-body text-cc-grey-9f">
              請確認輸入的編號是否正確
            </p>
          </div>
        </div>
      </template>

      <div v-else class="py-16 text-center flex flex-col gap-3 items-center">
        <div class="p-4 rounded-full bg-cc-primary/8">
          <div class="i-material-symbols-receipt-long-outline text-cc-primary h-12 w-12" />
        </div>
        <p class="text-body text-cc-grey-9f">
          輸入訂單編號以查看訂單詳情
        </p>
      </div>
    </div>
  </div>
</template>
