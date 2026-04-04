<script setup lang="ts">
import type { Product } from '~/types'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

defineProps<{
  title: string
  secTitle: string
  products: Product[]
  btnText?: string
}>()

const emit = defineEmits<{
  btnClick: []
}>()

const swiperKey = useId()
const { isBeginning, isEnd, onSwiper, onSlideChange } = useSwiperInit()
</script>

<template>
  <section class="mx-auto px-3 py-6 w-full md:px-4 xl:px-0 lg:max-w-[1328px]">
    <div class="xl:mx-4">
      <HomeSectionTitle :title="title" :sec-title="secTitle" />
    </div>
    <div class="relative xl:px-4">
      <Swiper
        :modules="[Navigation, A11y]"
        :a11y="{
          prevSlideMessage: '上一個',
          nextSlideMessage: '下一個',
          firstSlideMessage: '第一張',
          lastSlideMessage: '最後一張',
        }"
        :navigation="{
          prevEl: `.swiper-${swiperKey}-custom-prev`,
          nextEl: `.swiper-${swiperKey}-custom-next`,
        }"
        :slides-per-view="1.5"
        :space-between="24"
        :speed="300"
        :loop="true"
        :breakpoints="{
          640: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 24, speed: 800, loop: true },
          768: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 24, speed: 1000, loop: true },
          1280: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 24, speed: 1200, loop: true },
        }"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="(product, index) in products" :key="product.id || index">
          <HomeProductCard :product :ranking="index + 1" />
        </SwiperSlide>
      </Swiper>
      <SwiperNav :classkey="swiperKey" :is-beginning="isBeginning" :is-end="isEnd" />
    </div>
    <div v-if="btnText" class="mt-6 text-center md:(mb-6 mt-12)">
      <button
        type="button"
        class="text-sm text-white font-bold px-6 py-3 rounded-[5px] bg-cc-primary inline-flex gap-2 min-h-[48px] min-w-[110px] cursor-pointer whitespace-nowrap transition-colors duration-300 items-center justify-center relative hover:bg-cc-accent"
        @click="emit('btnClick')"
      >
        {{ btnText }}
      </button>
    </div>
  </section>
</template>

<!-- Swiper 內部元素無法用 utility 覆寫，需用 :deep() -->
<style scoped>
:deep(.swiper-btn) {
  top: calc(50% - (120px + 8px) / 2);
}

:deep(.swiper) {
  padding-bottom: 8px;
}
</style>
