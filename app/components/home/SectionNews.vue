<script setup lang="ts">
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { mockNews } from '~/constants'
import 'swiper/css'

const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiperInit()
</script>

<template>
  <section class="mx-auto px-3 py-6 w-full md:px-4 xl:px-0 lg:max-w-[1328px]">
    <div class="xl:mx-4">
      <HomeSectionTitle
        title="最新旅遊優惠"
        sec-title="旅行變得更簡單！我們提供最新的旅遊優惠，讓您輕鬆規劃完美的旅程！"
      />
    </div>
    <div class="relative xl:px-4">
      <Swiper
        :modules="[Navigation, A11y]"
        :a11y="{ prevSlideMessage: '上一個', nextSlideMessage: '下一個' }"
        :navigation="{
          prevEl: '.swiper-news-custom-prev',
          nextEl: '.swiper-news-custom-next',
        }"
        :slides-per-view="1"
        :space-between="24"
        :speed="600"
        :breakpoints="{
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 2, slidesPerGroup: 2, speed: 400 },
          1280: { slidesPerView: 3, spaceBetween: 24 },
        }"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(item, idx) in mockNews" :key="idx">
          <HomeNewCard v-bind="item" />
        </SwiperSlide>
      </Swiper>
      <SwiperNav classkey="news" :is-beginning="isBeginning" :is-end="isEnd" />
    </div>
  </section>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  :deep(.swiper) {
    height: 768px;
  }
}
</style>
