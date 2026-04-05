<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="bg-white/95 flex flex-col items-center inset-0 justify-center fixed z-50 backdrop-blur-sm"
      >
        <div class="i-material-symbols-progress-activity text-cc-accent h-12 w-12 animate-spin" />
        <p class="text-h5 text-cc-black mt-4">
          付款處理中...
        </p>
        <p class="text-body text-cc-grey-9f mt-2">
          請稍候，正在處理您的付款
        </p>
      </div>
    </Transition>
  </Teleport>
</template>
