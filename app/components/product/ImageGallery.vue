<script setup lang="ts">
const props = defineProps<{
  mainImage: string
  images?: string[]
  alt?: string
}>()

const selectedIndex = ref(-1)

const allImages = computed(() => {
  const imgs = [props.mainImage]
  if (props.images?.length)
    imgs.push(...props.images)
  return imgs
})

const currentImage = computed(() => {
  if (selectedIndex.value >= 0 && selectedIndex.value < allImages.value.length)
    return allImages.value[selectedIndex.value]
  return props.mainImage
})
</script>

<template>
  <div>
    <div class="rounded-xl overflow-hidden">
      <NuxtImg :src="currentImage" :alt="alt" class="img-cover w-full aspect-[4/3]" />
    </div>
    <div v-if="allImages.length > 1" class="mt-4 gap-2 grid grid-cols-5">
      <button
        v-for="(img, idx) in allImages"
        :key="idx"
        type="button"
        class="rounded-lg transition overflow-hidden"
        :class="[
          (selectedIndex === -1 && idx === 0) || selectedIndex === idx
            ? 'ring-2 ring-cc-primary'
            : 'opacity-70 hover:opacity-100',
        ]"
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
</template>
