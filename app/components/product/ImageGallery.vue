<script setup lang="ts">
const props = defineProps<{
  mainImage: string
  images?: string[]
  alt?: string
}>()

const selectedIndex = ref(0)

const allImages = computed(() => {
  const imgs = [props.mainImage]
  if (props.images?.length)
    imgs.push(...props.images)
  return imgs
})

const currentImage = computed(() => allImages.value[selectedIndex.value] ?? props.mainImage)

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

function openLightbox() {
  lightboxIndex.value = selectedIndex.value
  lightboxOpen.value = true
  nextTick(() => {
    document.querySelector<HTMLElement>('[data-lightbox]')?.focus()
  })
}

function prevImage() {
  lightboxIndex.value = (lightboxIndex.value - 1 + allImages.value.length) % allImages.value.length
}

function nextImage() {
  lightboxIndex.value = (lightboxIndex.value + 1) % allImages.value.length
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="rounded-2xl cursor-pointer relative overflow-hidden" @click="openLightbox">
      <NuxtImg
        :src="currentImage"
        :alt
        class="img-cover w-full aspect-[4/3] transition-opacity duration-300"
        fetchpriority="high"
      />
    </div>

    <div v-if="allImages.length > 1" class="gap-2 grid grid-cols-5">
      <button
        v-for="(img, idx) in allImages"
        :key="idx"
        type="button"
        class="rounded-xl transition-all duration-200 overflow-hidden"
        :class="
          selectedIndex === idx
            ? 'ring-2 ring-cc-primary ring-offset-2'
            : 'opacity-60 hover:opacity-100'
        "
        :aria-label="`查看圖片 ${idx + 1}`"
        :aria-current="selectedIndex === idx ? 'true' : undefined"
        @click="selectedIndex = idx"
      >
        <NuxtImg
          :src="img"
          :alt="`${alt} ${idx + 1}`"
          class="img-cover w-full aspect-square"
          loading="lazy"
        />
      </button>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="lightboxOpen"
        data-lightbox
        tabindex="-1"
        class="bg-black/90 flex items-center inset-0 justify-center fixed z-[100]"
        @click.self="lightboxOpen = false"
        @keydown.escape="lightboxOpen = false"
        @keydown.left="prevImage"
        @keydown.right="nextImage"
      >
        <button
          type="button"
          class="text-white/70 p-2 right-4 top-4 absolute z-10 hover:text-white"
          aria-label="關閉"
          @click="lightboxOpen = false"
        >
          <div class="i-material-symbols-close h-8 w-8" />
        </button>

        <button
          v-if="allImages.length > 1"
          type="button"
          class="text-white/70 p-2 left-4 absolute hover:text-white"
          aria-label="上一張"
          @click="prevImage"
        >
          <div class="i-material-symbols-chevron-left h-10 w-10" />
        </button>

        <img
          :src="allImages[lightboxIndex]"
          :alt="`${alt} ${lightboxIndex + 1}`"
          class="max-h-[85vh] max-w-[90vw] select-none object-contain"
        >

        <button
          v-if="allImages.length > 1"
          type="button"
          class="text-white/70 p-2 right-4 absolute hover:text-white"
          aria-label="下一張"
          @click="nextImage"
        >
          <div class="i-material-symbols-chevron-right h-10 w-10" />
        </button>

        <div class="text-sm text-white/70 bottom-6 absolute tabular-nums">
          {{ lightboxIndex + 1 }} / {{ allImages.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
