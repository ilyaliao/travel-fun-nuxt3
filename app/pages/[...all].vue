<script setup lang="ts">
useSeoMeta({ title: '頁面不存在' })
</script>

<template>
  <div class="px-4 flex flex-col min-h-[60vh] items-center justify-center">
    <h1 class="text-[6rem] text-cc-grey-d4 font-bold">
      404
    </h1>
    <p class="text-body text-cc-grey-66 mt-2">
      找不到這個頁面
    </p>
    <NuxtLink to="/" class="btn-primary mt-6 px-6 py-2">
      回到首頁
    </NuxtLink>
  </div>
</template>
