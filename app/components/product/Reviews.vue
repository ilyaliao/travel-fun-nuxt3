<script setup lang="ts">
import type { Review } from '~/types'

const props = defineProps<{
  reviews: Review[]
  averageRating: number
  totalCount: number
}>()

const DEFAULT_VISIBLE = 5
const showAll = ref(false)

const visibleReviews = computed(() =>
  showAll.value ? props.reviews : props.reviews.slice(0, DEFAULT_VISIBLE),
)

const distribution = computed(() => {
  return [5, 4, 3, 2, 1].map((star) => {
    const count = props.reviews.filter(r => r.rating === star).length
    const pct = props.totalCount > 0 ? Math.round((count / props.totalCount) * 100) : 0
    return { star, count, pct }
  })
})

function formatDate(ts: number) {
  return new Date(ts * 1000).toLocaleDateString('zh-TW')
}
</script>

<template>
  <section>
    <h2 class="text-h4 tracking-normal mb-6">
      旅客評價
    </h2>

    <!-- Summary -->
    <div class="mb-8 flex flex-col gap-8 sm:flex-row">
      <!-- Left: score -->
      <div class="flex flex-col gap-1 min-w-32 items-center justify-center">
        <span class="text-5xl text-cc-accent leading-none font-bold tabular-nums">
          {{ averageRating.toFixed(1) }}
        </span>
        <UiRating :value="averageRating" />
        <span class="text-sm text-cc-grey-66 tabular-nums">{{ totalCount }} 則評論</span>
      </div>

      <!-- Right: distribution bars -->
      <div class="flex flex-1 flex-col gap-2">
        <div v-for="{ star, pct } in distribution" :key="star" class="flex gap-2 items-center">
          <span class="text-sm text-cc-grey-66 shrink-0 w-4 tabular-nums">{{ star }}</span>
          <div class="i-material-symbols-star text-cc-accent shrink-0 h-4 w-4" />
          <div class="rounded-full bg-cc-grey-e9 flex-1 h-2 overflow-hidden">
            <div
              class="rounded-full bg-cc-accent h-full transition-all duration-300"
              :style="{ width: `${pct}%` }"
            />
          </div>
          <span class="text-sm text-cc-grey-66 text-right shrink-0 w-8 tabular-nums">{{ pct }}%</span>
        </div>
      </div>
    </div>

    <!-- Review list -->
    <div class="divide-cc-grey-e9 divide-y">
      <div
        v-for="review in visibleReviews"
        :key="review.id"
        class="py-4 border-b border-cc-grey-e9 last:border-b-0"
      >
        <div class="flex gap-3 items-start">
          <!-- Avatar -->
          <div
            class="text-sm text-cc-primary font-semibold rounded-full bg-cc-primary/10 flex shrink-0 h-8 w-8 items-center justify-center"
          >
            {{ review.userName.charAt(0) }}
          </div>

          <div class="flex-1 min-w-0">
            <div class="mb-1 flex flex-wrap gap-x-3 gap-y-0.5 items-center">
              <span class="text-sm font-medium">{{ review.userName }}</span>
              <UiRating :value="review.rating" />
              <span class="text-xs text-cc-grey-9f tabular-nums">{{
                formatDate(review.createdAt)
              }}</span>
            </div>
            <p class="text-sm text-cc-grey-66 leading-relaxed">
              {{ review.comment }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Expand button -->
    <div v-if="reviews.length > DEFAULT_VISIBLE && !showAll" class="mt-4">
      <button
        class="text-sm text-cc-primary font-medium focus-visible:(outline-none rounded ring-2 ring-cc-primary) hover:underline"
        @click="showAll = true"
      >
        查看全部 {{ reviews.length }} 則評論 →
      </button>
    </div>
  </section>
</template>
