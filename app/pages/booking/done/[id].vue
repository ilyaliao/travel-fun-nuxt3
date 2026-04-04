<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id as string)
const { data } = useOrderQuery(id)

const order = computed(() => data.value?.order)

useSeoMeta({ title: '訂單完成' })
</script>

<template>
  <div class="mx-auto px-4 py-16 text-center max-w-2xl">
    <div class="i-material-symbols-check-circle-outline text-green-500 mx-auto mb-4 h-16 w-16" />
    <h1 class="text-h3">
      訂單已完成！
    </h1>
    <p class="text-body text-cc-grey-66 mt-2">
      感謝您的訂購，我們會盡快為您處理。
    </p>

    <div v-if="order" class="mt-6 p-6 text-left border border-cc-grey-e9 rounded-xl">
      <div class="text-body mb-2 flex justify-between">
        <span class="text-cc-grey-66">訂單編號</span>
        <span class="text-xs font-mono">{{ id }}</span>
      </div>
      <div class="text-body flex justify-between">
        <span class="text-cc-grey-66">訂購人</span>
        <span>{{ order.user.name }}</span>
      </div>
    </div>

    <NuxtLink to="/" class="btn-primary mt-8 px-8 py-3 inline-block">
      回到首頁
    </NuxtLink>
  </div>
</template>
