<script setup lang="ts">
const props = defineProps<{
  sections: { id: string, label: string }[]
}>()

const activeSection = ref<string>(props.sections[0]?.id ?? '')

let observers: IntersectionObserver[] = []

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    { rootMargin: '-20% 0px -70% 0px' },
  )

  for (const section of props.sections) {
    const el = document.getElementById(section.id)
    if (el) {
      observer.observe(el)
    }
  }

  observers = [observer]
})

onUnmounted(() => {
  for (const obs of observers) {
    obs.disconnect()
  }
})
</script>

<template>
  <nav class="border-b border-cc-grey-e9 bg-white hidden top-0 sticky z-40 lg:block">
    <div class="mx-auto px-4 flex gap-6 max-w-[1296px] overflow-x-auto">
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        class="text-sm py-3 border-b-2 whitespace-nowrap transition-colors"
        :class="
          activeSection === section.id
            ? 'border-cc-primary text-cc-primary font-medium'
            : 'border-transparent text-cc-grey-66 hover:text-cc-black'
        "
        @click="scrollToSection(section.id)"
      >
        {{ section.label }}
      </button>
    </div>
  </nav>
</template>
