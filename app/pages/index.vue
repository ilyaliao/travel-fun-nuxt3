<script setup lang="ts">
useSeoMeta({
  title: '首頁',
  ogTitle: '旅遊趣 — 台灣旅遊套票訂購平台',
  description: '陪你去台灣各地，探索美麗的風景與文化',
})
</script>

<template>
  <div>
    <HomeHeroBanner />
    <HomeSectionNews />
    <HomeSectionTopProducts />
    <HomeParallaxTransition />
    <!-- SectionNewProducts will use real API data later -->
    <HomeSectionHotCities />
    <HomeSectionMember />
  </div>
</template>
