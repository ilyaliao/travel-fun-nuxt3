<script setup lang="ts">
import type { Order } from "~/types";
import { toast } from "vue-sonner";

const addOrderMutation = useAddOrder();

const form = reactive({
  name: "",
  email: "",
  tel: "",
  address: "",
  message: "",
});

async function submitOrder() {
  if (!form.name || !form.email || !form.tel || !form.address) {
    toast.error("請填寫所有必填欄位");
    return;
  }

  const orderData: Order = {
    user: {
      name: form.name,
      email: form.email,
      tel: form.tel,
      address: form.address,
    },
    message: form.message,
  };

  addOrderMutation.mutate(
    { data: orderData },
    {
      onSuccess: (res) => {
        if (res.orderId) {
          navigateTo(`/booking/pay/${res.orderId}`);
        }
      },
      onError: () => {
        toast.error("訂單建立失敗");
      },
    },
  );
}

useSeoMeta({ title: "填寫訂單" });
</script>

<template>
  <div class="mx-auto px-4 py-8 max-w-2xl">
    <UiBreadcrumb class="mb-6">
      <UiBreadcrumbItem>
        <NuxtLink to="/" class="hover:text-cc-primary"> 首頁 </NuxtLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <NuxtLink to="/cart" class="hover:text-cc-primary"> 購物車 </NuxtLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <span class="text-cc-black">填寫訂單</span>
      </UiBreadcrumbItem>
    </UiBreadcrumb>

    <h1 class="text-h3 mb-6">填寫訂單資料</h1>

    <form class="flex flex-col gap-5" @submit.prevent="submitOrder">
      <div>
        <label class="text-body text-cc-black font-medium mb-1 block">姓名 *</label>
        <UiInput v-model="form.name" placeholder="請輸入姓名" />
      </div>
      <div>
        <label class="text-body text-cc-black font-medium mb-1 block">Email *</label>
        <UiInput v-model="form.email" type="email" placeholder="請輸入 Email" />
      </div>
      <div>
        <label class="text-body text-cc-black font-medium mb-1 block">電話 *</label>
        <UiInput v-model="form.tel" type="tel" placeholder="請輸入電話" />
      </div>
      <div>
        <label class="text-body text-cc-black font-medium mb-1 block">地址 *</label>
        <UiInput v-model="form.address" placeholder="請輸入地址" />
      </div>
      <div>
        <label class="text-body text-cc-black font-medium mb-1 block">備註</label>
        <textarea
          v-model="form.message"
          rows="3"
          placeholder="有什麼想告訴我們的嗎？"
          class="text-body px-3 py-2 outline-none border border-cc-grey-d4 rounded-[5px] w-full focus:(ring-2 ring-cc-primary ring-offset-2)"
        />
      </div>

      <button type="submit" class="btn py-3 w-full" :disabled="addOrderMutation.isPending.value">
        {{ addOrderMutation.isPending.value ? "處理中..." : "送出訂單" }}
      </button>
    </form>
  </div>
</template>
