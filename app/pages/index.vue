<script setup lang="ts">
import { mockHotCitys } from '~/constants'

const { data } = useAllProducts()

const popular = computed(() => {
  if (!data.value?.products)
    return []
  return [...data.value.products]
    .sort((a, b) => b.evaluate - a.evaluate || b.evaluateNum - a.evaluateNum)
    .slice(0, 10)
})

const newest = computed(() => {
  if (!data.value?.products)
    return []
  return [...data.value.products]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
})

useSeoMeta({
  title: '首頁',
  ogTitle: '旅遊趣 — 台灣旅遊套票訂購平台',
  description: '陪你去台灣各地，探索美麗的風景與文化',
})
</script>

<template>
  <main>
    <HomeHeroBanner />
    <div class="mb-4 md:(mb-0 mt-[60px])">
      <HomeSectionNews />
    </div>
    <img
      src="/images/travel-the-world.png"
      alt="travel world fun"
      class="hidden md:block -translate-y-8 -z-10"
    >
    <HomeSwiperProducts
      title="Top 10 商品"
      sec-title="尋找最受歡迎的商品嗎？別再猶豫，立刻挑選！"
      :products="popular"
    />
    <img src="/images/home-bg.png" alt="home bg" class="my-6 w-full" loading="lazy">
    <HomeSwiperProducts
      title="最新產品"
      sec-title="一直關注最新產品的我們，給您帶來最好的選擇和品質！"
      btn-text="查看更多"
      :products="newest"
      @btn-click="navigateTo('/products')"
    />
    <HomeSectionHotCities :hot-citys="mockHotCitys" />
    <HomeSectionMember />
  </main>
</template>
