<script setup lang="ts">
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { mockProducts } from '~/constants'
import 'swiper/css'

const { isBeginning, isEnd, onSwiper, onSlideChange, goNext, goPrev } = useSwiperInit()

// Take top 10 by evaluate
const topProducts = computed(() =>
  [...mockProducts].sort((a, b) => b.evaluate - a.evaluate).slice(0, 10),
)
</script>

<template>
  <section class="max-w-cc-width mx-auto px-4 py-12">
    <div class="flex items-end justify-between">
      <HomeSectionTitle title="Top 10 商品" subtitle="尋找最受歡迎的商品嗎？別再猶豫，立刻搶購！" />
      <SwiperNav :is-beginning="isBeginning" :is-end="isEnd" @prev="goPrev" @next="goNext" />
    </div>

    <Swiper
      :modules="[FreeMode]"
      :slides-per-view="2.2"
      :space-between="16"
      :breakpoints="{
        640: { slidesPerView: 3.2 },
        1024: { slidesPerView: 5 },
        1280: { slidesPerView: 6 },
      }"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="(item, idx) in topProducts" :key="idx">
        <div class="group block">
          <div class="border border-cc-grey-e9 rounded-xl bg-white overflow-hidden">
            <div class="aspect-square relative overflow-hidden">
              <img
                :src="item.image"
                :alt="item.title"
                class="img-cover transition-transform duration-300 group-hover:scale-105"
              >
              <span
                class="text-xs text-white font-bold rounded-full flex h-6 w-6 items-center left-2 top-2 justify-center absolute"
                :class="idx < 3 ? 'bg-cc-accent' : 'bg-cc-grey-66'"
              >
                {{ idx + 1 }}
              </span>
              <button
                class="rounded-full bg-white/80 flex h-7 w-7 items-center right-2 top-2 justify-center absolute hover:bg-white"
              >
                <div class="i-material-symbols-favorite-outline text-cc-grey-66 h-4 w-4" />
              </button>
            </div>
            <div class="p-2">
              <div class="text-xs text-cc-grey-9f flex gap-1 items-center">
                <div class="i-material-symbols-location-on-outline h-3 w-3" />
                {{ item.location }}
              </div>
              <h3 class="text-xs text-cc-black font-medium mt-1 line-clamp-2">
                {{ item.title }}
              </h3>
              <UiRating :value="item.evaluate" :count="item.evaluateTotal" class="mt-1" />
              <div class="mt-1 flex gap-1 items-baseline">
                <span class="text-xs text-cc-accent font-bold">NT$ {{ item.price }}</span>
                <span
                  v-if="item.originprice && item.originprice > item.price"
                  class="text-xs text-cc-grey-9f line-through"
                >
                  ${{ item.originprice }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>
