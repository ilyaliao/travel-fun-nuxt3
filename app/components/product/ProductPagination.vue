<script setup lang="ts">
import type { Pagination } from '~/types'

const props = defineProps<{
  pagination: Pagination
}>()

const emit = defineEmits<{
  'update:page': [value: number]
}>()

const pages = computed(() => {
  const { current_page, total_pages } = props.pagination
  const range: number[] = []
  const start = Math.max(1, current_page - 2)
  const end = Math.min(total_pages, current_page + 2)
  for (let i = start; i <= end; i++) range.push(i)
  return range
})

const firstPage = computed(() => pages.value[0] ?? 1)
const lastPage = computed(() => pages.value.at(-1) ?? 1)
</script>

<template>
  <nav
    v-if="pagination.total_pages > 1"
    class="mt-8 flex gap-1 items-center justify-center"
    aria-label="分頁"
  >
    <button
      type="button"
      class="rounded-xl inline-flex h-10 w-10 transition-colors items-center justify-center hover:bg-cc-grey-f7 disabled:(opacity-50 pointer-events-none)"
      :disabled="!pagination.has_pre"
      aria-label="上一頁"
      @click="emit('update:page', pagination.current_page - 1)"
    >
      <div class="i-material-symbols-chevron-left h-5 w-5" />
    </button>

    <button
      v-if="firstPage > 1"
      type="button"
      class="text-sm rounded-xl h-10 w-10 transition-colors hover:bg-cc-grey-f7"
      @click="emit('update:page', 1)"
    >
      1
    </button>
    <span v-if="firstPage > 2" class="text-cc-grey-9f px-1">…</span>

    <button
      v-for="p in pages"
      :key="p"
      type="button"
      class="text-sm font-medium rounded-xl h-10 w-10 transition-colors"
      :class="p === pagination.current_page ? 'bg-cc-primary text-white' : 'hover:bg-cc-grey-f7'"
      :aria-current="p === pagination.current_page ? 'page' : undefined"
      @click="emit('update:page', p)"
    >
      {{ p }}
    </button>

    <span v-if="lastPage < pagination.total_pages - 1" class="text-cc-grey-9f px-1">…</span>
    <button
      v-if="lastPage < pagination.total_pages"
      type="button"
      class="text-sm rounded-xl h-10 w-10 transition-colors hover:bg-cc-grey-f7"
      @click="emit('update:page', pagination.total_pages)"
    >
      {{ pagination.total_pages }}
    </button>

    <button
      type="button"
      class="rounded-xl inline-flex h-10 w-10 transition-colors items-center justify-center hover:bg-cc-grey-f7 disabled:(opacity-50 pointer-events-none)"
      :disabled="!pagination.has_next"
      aria-label="下一頁"
      @click="emit('update:page', pagination.current_page + 1)"
    >
      <div class="i-material-symbols-chevron-right h-5 w-5" />
    </button>
  </nav>
</template>
