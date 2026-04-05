<script setup lang="ts">
import { toast } from 'vue-sonner'
import { categoryMap, cityMap } from '~/constants'
import { currency } from '~/utils/currency'

const route = useRoute()
const id = computed(() => route.params.id as string)
const { data, isLoading } = useProduct(id)
const product = computed(() => data.value?.product)
const productReviews = computed(() => data.value?.reviews ?? [])
const productFaqs = computed(() => data.value?.faqs ?? [])
const cityName = computed(() =>
  product.value ? cityMap.get(product.value.city) || product.value.city : '',
)
const categoryName = computed(() =>
  product.value ? categoryMap.get(product.value.category) || product.value.category : '',
)

// Plan selection
const selectedPlanIndex = ref(0)
const selectedPlan = computed(() => product.value?.plans?.[selectedPlanIndex.value])
const displayPrice = computed(() => selectedPlan.value?.price ?? product.value?.price ?? 0)
const displayOriginPrice = computed(
  () => selectedPlan.value?.origin_price ?? product.value?.origin_price ?? 0,
)
const discountPercent = computed(() => {
  if (displayOriginPrice.value <= displayPrice.value)
    return 0
  return Math.round((1 - displayPrice.value / displayOriginPrice.value) * 100)
})

// Quantity
const qty = ref(1)

// Date — buy_date is a timestamp
const today = new Date().toISOString().split('T')[0]
const dateStr = ref(today)
// Cart
const cartStore = useCartStore()

function handleAddToCart() {
  if (!product.value)
    return
  const plan = selectedPlan.value
    ? { title: selectedPlan.value.title, price: selectedPlan.value.price }
    : undefined
  cartStore.addItem(product.value, qty.value, plan, dateStr.value)
  toast.success('已加入購物車')
}

// Favorites
const { checkFavorite, toggleFavorite: toggleFav } = useFavoriteHelpers()
const isFavorite = computed(() => (product.value ? checkFavorite(product.value.id) : false))
function toggleFavorite() {
  if (!product.value)
    return
  toggleFav(product.value.id)
}

// Related products (same city, server-filtered, exclude self)
const { data: relatedData } = useProducts(
  computed(() => ({
    city: product.value?.city,
    sort: 'popular',
    limit: 8,
  })),
)
const relatedProducts = computed(() => {
  if (!relatedData.value?.products || !product.value)
    return []
  return relatedData.value.products.filter(p => p.id !== product.value!.id).slice(0, 6)
})

useSeoMeta({
  title: () => product.value?.title || '商品詳情',
  ogImage: () => product.value?.imageUrl,
  description: () => product.value?.description,
})
</script>

<template>
  <div class="mx-auto px-4 py-6 pb-24 max-w-[1296px] lg:pb-6">
    <UiBreadcrumb class="mb-6">
      <UiBreadcrumbItem>
        <NuxtLink to="/" class="hover:text-cc-primary">
          首頁
        </NuxtLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <NuxtLink to="/products" class="hover:text-cc-primary">
          景點套票
        </NuxtLink>
      </UiBreadcrumbItem>
      <UiBreadcrumbSeparator />
      <UiBreadcrumbItem>
        <span class="text-cc-black">{{ product?.title || "商品詳情" }}</span>
      </UiBreadcrumbItem>
    </UiBreadcrumb>

    <div
      v-if="isLoading"
      role="status"
      aria-label="載入中"
      class="py-20 flex items-center justify-center"
    >
      <div class="i-material-symbols-progress-activity text-cc-primary h-8 w-8 animate-spin" />
    </div>

    <template v-else-if="product">
      <div class="flex flex-col gap-8 lg:(flex-row gap-10)">
        <div class="lg:w-3/5">
          <ProductImageGallery
            :main-image="product.imageUrl"
            :images="product.imagesUrl"
            :alt="product.title"
          />
        </div>

        <div class="flex flex-col gap-5 lg:(w-2/5 self-start top-24 sticky)">
          <div class="flex flex-wrap gap-2 items-center">
            <span
              class="text-xs text-cc-primary font-medium px-2.5 py-0.5 rounded-full bg-cc-primary/10"
            >
              {{ categoryName }}
            </span>
            <NuxtLink
              :to="`/products/city/${product.city}`"
              class="text-sm text-cc-grey-66 inline-flex gap-0.5 items-center hover:text-cc-primary"
            >
              <div class="i-material-symbols-location-on-outline h-4 w-4" />
              {{ cityName }}
            </NuxtLink>
            <span v-if="product.address" class="text-sm text-cc-grey-66">
              · {{ product.address }}
            </span>
          </div>

          <h1 class="text-h3 leading-tight tracking-normal">
            {{ product.title }}
          </h1>

          <UiRating :value="product.evaluate" :count="product.evaluateNum" />

          <div class="flex gap-3 items-center">
            <span class="text-2xl text-cc-accent tracking-tight font-bold tabular-nums">
              {{ currency(displayPrice) }}
            </span>
            <span
              v-if="displayOriginPrice > displayPrice"
              class="text-sm text-cc-grey-66 line-through tabular-nums"
            >
              {{ currency(displayOriginPrice, "$") }}
            </span>
            <span
              v-if="discountPercent > 0"
              class="text-xs text-white font-medium px-2 py-0.5 rounded-full bg-cc-accent"
            >
              省 {{ discountPercent }}%
            </span>
          </div>

          <p v-if="product.description" class="text-body text-cc-grey-66 leading-relaxed">
            {{ product.description }}
          </p>

          <div class="bg-cc-grey-e9 h-px" />

          <div v-if="product.plans?.length">
            <h3 class="text-sm text-cc-grey-66 font-medium mb-3">
              方案選擇
            </h3>
            <div role="radiogroup" aria-label="方案選擇" class="flex flex-col gap-2.5">
              <button
                v-for="(plan, idx) in product.plans"
                :key="idx"
                type="button"
                role="radio"
                :aria-checked="selectedPlanIndex === idx"
                class="p-4 text-left border rounded-xl flex gap-3 cursor-pointer transition-all items-start"
                :class="
                  selectedPlanIndex === idx
                    ? 'border-cc-primary bg-cc-primary/5 shadow-sm'
                    : 'border-cc-grey-e9 hover:border-cc-grey-d4'
                "
                @click="selectedPlanIndex = idx"
              >
                <div
                  class="mt-0.5 border-2 rounded-full flex flex-shrink-0 h-5 w-5 items-center justify-center"
                  :class="selectedPlanIndex === idx ? 'border-cc-primary' : 'border-cc-grey-d4'"
                >
                  <div
                    v-if="selectedPlanIndex === idx"
                    class="rounded-full bg-cc-primary h-2.5 w-2.5"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-semibold">
                    {{ plan.title }}
                  </h4>
                  <div
                    class="text-xs text-cc-grey-66 mt-1 line-clamp-2"
                    v-html="plan.description"
                  />
                  <div class="mt-2 flex gap-2 items-baseline">
                    <span class="text-sm text-cc-accent font-bold tabular-nums">
                      {{ currency(plan.price) }}
                    </span>
                  </div>
                  <div
                    v-if="
                      plan.includes?.length
                        || plan.duration
                        || plan.applicableTo
                        || plan.cancellationPolicy
                    "
                    class="mt-2 flex flex-wrap gap-1.5"
                  >
                    <span
                      v-for="item in plan.includes"
                      :key="item"
                      class="text-xs text-cc-primary px-2 py-0.5 rounded bg-cc-primary/10"
                    >
                      {{ item }}
                    </span>
                    <span
                      v-if="plan.duration"
                      class="text-xs text-cc-grey-66 px-2 py-0.5 rounded bg-cc-grey-f7"
                    >
                      ⏱ {{ plan.duration }}
                    </span>
                    <span
                      v-if="plan.applicableTo"
                      class="text-xs text-cc-grey-66 px-2 py-0.5 rounded bg-cc-grey-f7"
                    >
                      👤 {{ plan.applicableTo }}
                    </span>
                    <span
                      v-if="plan.cancellationPolicy"
                      class="text-xs text-cc-success px-2 py-0.5 rounded bg-cc-success/10"
                    >
                      ✓ {{ plan.cancellationPolicy }}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 items-end">
            <div class="flex-1 min-w-40">
              <label for="buy-date" class="text-sm text-cc-grey-66 font-medium mb-1.5 block">
                選擇日期
              </label>
              <input
                id="buy-date"
                v-model="dateStr"
                type="date"
                :min="today"
                class="text-sm px-3 py-2 border border-cc-grey-d4 rounded-xl bg-white h-10 w-full transition focus:(outline-none border-cc-primary ring-2 ring-cc-primary)"
              >
            </div>
            <div>
              <label for="qty-selector" class="text-sm text-cc-grey-66 font-medium mb-1.5 block">數量</label>
              <ProductQuantitySelector id="qty-selector" v-model="qty" />
            </div>
          </div>

          <div class="flex gap-3">
            <button
              class="btn text-base font-semibold py-3 rounded-xl flex-1"
              @click="handleAddToCart"
            >
              加入購物車
            </button>
            <button
              type="button"
              class="p-3 border border-cc-grey-d4 rounded-xl inline-flex transition-colors items-center justify-center hover:bg-cc-grey-f7"
              :aria-label="isFavorite ? '取消收藏' : '加入收藏'"
              @click="toggleFavorite"
            >
              <div
                class="h-6 w-6"
                :class="
                  isFavorite
                    ? 'i-material-symbols-favorite text-cc-accent'
                    : 'i-material-symbols-favorite-outline'
                "
              />
            </button>
          </div>
        </div>
      </div>

      <ProductSectionNav
        :sections="[
          ...(product.content ? [{ id: 'section-intro', label: '商品介紹' }] : []),
          ...(product.usage ? [{ id: 'section-usage', label: '使用方式' }] : []),
          ...(product.features ? [{ id: 'section-notes', label: '注意事項' }] : []),
          ...(product.coordinates ? [{ id: 'section-map', label: '景點位置' }] : []),
          ...(productReviews.length ? [{ id: 'section-reviews', label: '旅客評論' }] : []),
          ...(productFaqs.length ? [{ id: 'section-faq', label: '常見問題' }] : []),
        ]"
      />

      <div class="lg:max-w-[60%]">
        <section v-if="product.content" id="section-intro" class="mt-10">
          <h2 class="text-h4 tracking-normal mb-4 flex gap-2 items-center">
            <div class="i-material-symbols-info-outline text-cc-primary h-6 w-6" />
            商品介紹
          </h2>
          <div
            class="prose-content text-sm text-cc-grey-66 leading-relaxed"
            v-html="product.content"
          />
        </section>

        <section v-if="product.usage" id="section-usage" class="mt-10 p-6 rounded-xl bg-cc-grey-f7">
          <h2 class="text-h4 tracking-normal mb-4 flex gap-2 items-center">
            <div class="i-material-symbols-confirmation-number-outline text-cc-primary h-6 w-6" />
            使用方式
          </h2>
          <div
            class="prose-content text-sm text-cc-grey-66 leading-relaxed"
            v-html="product.usage"
          />
        </section>

        <section v-if="product.features" id="section-notes" class="mt-10">
          <h2 class="text-h4 tracking-normal mb-4 flex gap-2 items-center">
            <div class="i-material-symbols-warning-outline text-cc-accent h-6 w-6" />
            注意事項
          </h2>
          <div
            class="prose-content text-sm text-cc-grey-66 leading-relaxed"
            v-html="product.features"
          />
        </section>

        <div v-if="product.coordinates" id="section-map" class="mt-10">
          <ProductMap
            :coordinates="product.coordinates"
            :address="product.address"
            :title="product.title"
          />
        </div>

        <div v-if="productReviews.length" id="section-reviews" class="mt-10">
          <ProductReviews
            :reviews="productReviews"
            :average-rating="product.evaluate"
            :total-count="product.evaluateNum"
          />
        </div>

        <div v-if="productFaqs.length" id="section-faq" class="mt-10">
          <ProductFaqs :faqs="productFaqs" />
        </div>
      </div>

      <section v-if="relatedProducts.length" class="mt-16">
        <HomeSwiperProducts
          title="你可能也會喜歡"
          :sec-title="`探索${cityName}更多景點體驗`"
          :products="relatedProducts"
        />
      </section>
    </template>

    <UiEmpty v-else description="找不到此商品" />

    <div
      v-if="product"
      class="px-4 py-3 border-t border-cc-grey-e9 bg-white flex gap-3 shadow-lg items-center inset-x-0 bottom-0 fixed z-50 lg:hidden"
    >
      <div class="flex-1">
        <span class="text-lg text-cc-accent tracking-tight font-bold tabular-nums">
          {{ currency(displayPrice) }}
        </span>
        <span
          v-if="displayOriginPrice > displayPrice"
          class="text-xs text-cc-grey-66 ml-1 line-through tabular-nums"
        >
          {{ currency(displayOriginPrice, "$") }}
        </span>
      </div>
      <button class="btn text-sm font-semibold px-6 py-2.5 rounded-xl" @click="handleAddToCart">
        加入購物車
      </button>
    </div>
  </div>
</template>

<style scoped>
.prose-content :deep(h4) {
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
}
.prose-content :deep(ol) {
  padding-left: 1.25rem;
  list-style: decimal;
}
.prose-content :deep(ul) {
  padding-left: 1.25rem;
  list-style: disc;
}
.prose-content :deep(li) {
  margin-bottom: 0.25rem;
}
.prose-content :deep(p) {
  margin-bottom: 0.5rem;
}
.prose-content :deep(img) {
  max-width: 100%;
  border-radius: 0.5rem;
}
[id^='section-'] {
  scroll-margin-top: 4rem;
}
</style>
