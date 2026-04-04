import type { Swiper } from 'swiper/types'

export function useSwiperInit() {
  const swiperInstance = ref<Swiper>()
  const isBeginning = ref(true)
  const isEnd = ref(false)

  function onSwiper(swiper: Swiper) {
    swiperInstance.value = swiper
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
  }

  function onSlideChange(swiper: Swiper) {
    isBeginning.value = swiper.isBeginning
    isEnd.value = swiper.isEnd
  }

  function goNext() {
    swiperInstance.value?.slideNext()
  }

  function goPrev() {
    swiperInstance.value?.slidePrev()
  }

  return {
    isBeginning,
    isEnd,
    onSwiper,
    onSlideChange,
    goNext,
    goPrev,
  }
}
