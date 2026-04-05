<script setup lang="ts">
import { toast } from 'vue-sonner'

const cartStore = useCartStore()
const code = ref('')

const { mutateAsync: verifyCoupon, isLoading: isApplying } = useVerifyCoupon()

function handleApply() {
  if (!code.value.trim())
    return
  verifyCoupon({ code: code.value.trim(), orderAmount: cartStore.subtotal })
    .then((data) => {
      cartStore.setCoupon(data)
      toast.success('折扣碼已套用')
      code.value = ''
    })
    .catch((error: any) => {
      toast.error(error.data?.message || '驗證失敗，請稍後再試')
    })
}

function handleRemove() {
  cartStore.removeCoupon()
  toast.success('已移除折扣碼')
}
</script>

<template>
  <div>
    <div
      v-if="cartStore.coupon"
      class="p-3 rounded-lg bg-cc-success-light flex items-center justify-between"
    >
      <div class="flex gap-2 items-center">
        <div class="i-material-symbols-check-circle text-cc-success h-5 w-5" />
        <span class="text-body text-cc-success">{{ cartStore.coupon.title }} ({{ cartStore.coupon.code }})</span>
      </div>
      <button class="text-xs text-cc-grey-9f hover:text-cc-accent" @click="handleRemove">
        移除
      </button>
    </div>
    <form v-else class="flex gap-2" @submit.prevent="handleApply">
      <UiInput v-model="code" placeholder="輸入折扣碼" class="flex-1" />
      <button type="submit" class="btn shrink-0" :disabled="isApplying || !code.trim()">
        {{ isApplying ? "驗證中..." : "套用" }}
      </button>
    </form>
  </div>
</template>
