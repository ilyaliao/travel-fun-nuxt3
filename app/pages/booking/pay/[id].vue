<script setup lang="ts">
import { toast } from 'vue-sonner'
import { currency } from '~/utils/currency'

const route = useRoute()
const id = computed(() => route.params.id as string)
const { data, isLoading } = useOrderQuery(id)
const payMutation = usePayOrder()

const order = computed(() => data.value?.order)

async function handlePay() {
  payMutation.mutate(id.value, {
    onSuccess: () => {
      toast.success('付款成功！')
      navigateTo(`/booking/done/${id.value}`)
    },
    onError: () => {
      toast.error('付款失敗')
    },
  })
}

useSeoMeta({ title: '訂單付款' })
</script>

<template>
  <div class="mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-h3 mb-6">
      訂單付款
    </h1>

    <div v-if="isLoading" class="py-20 flex items-center justify-center">
      <div class="i-material-symbols-progress-activity text-cc-primary h-8 w-8 animate-spin" />
    </div>

    <div v-else-if="order" class="p-6 border border-cc-grey-e9 rounded-xl">
      <h3 class="text-h5 mb-4">
        訂單資訊
      </h3>
      <div class="text-body flex flex-col gap-2">
        <div class="flex justify-between">
          <span class="text-cc-grey-66">訂購人</span>
          <span>{{ order.user.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-cc-grey-66">Email</span>
          <span>{{ order.user.email }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-cc-grey-66">電話</span>
          <span>{{ order.user.tel }}</span>
        </div>
        <div class="my-2 bg-cc-grey-e9 h-px" />
        <div class="font-bold flex justify-between">
          <span>總計</span>
          <span class="text-cc-accent">{{ currency(order.total || 0) }}</span>
        </div>
      </div>

      <button
        class="btn mt-6 py-3 w-full"
        :disabled="payMutation.isPending.value"
        @click="handlePay"
      >
        {{ payMutation.isPending.value ? "付款中..." : "確認付款" }}
      </button>
    </div>

    <UiEmpty v-else description="找不到此訂單" />
  </div>
</template>
