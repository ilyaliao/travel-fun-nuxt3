<script setup lang="ts">
import { cityMap } from '~/constants'
import { currency } from '~/utils/currency'

const route = useRoute()
const id = computed(() => route.params.id as string)
const { data, isLoading } = useProduct(id)
const product = computed(() => data.value?.product)
const cityName = computed(() =>
  product.value ? cityMap.get(product.value.city) || product.value.city : '',
)

// Plan selection
const selectedPlanIndex = ref(0)
const selectedPlan = computed(() => product.value?.plans?.[selectedPlanIndex.value])
const displayPrice = computed(() => selectedPlan.value?.price ?? product.value?.price ?? 0)
const displayOriginPrice = computed(
  () => selectedPlan.value?.origin_price ?? product.value?.origin_price ?? 0,
)

// Quantity
const qty = ref(1)

// Date — buy_date is a timestamp
const dateStr = ref(new Date().toISOString().split('T')[0])
const buyDate = computed(() => new Date(dateStr.value).getTime())

// Cart
const { mutate: addToCart, isPending: isAdding } = useAddCart()
function handleAddToCart() {
  if (!product.value)
    return
  addToCart({
    data: {
      product_id: product.value.id,
      qty: qty.value,
      buy_date: buyDate.value,
    },
  })
}

// Favorites
const favoriteStore = useFavoriteStore()
const isFavorite = computed(() =>
  product.value ? favoriteStore.checkFavorite(product.value.id) : false,
)
function toggleFavorite() {
  if (!product.value)
    return
  if (isFavorite.value)
    favoriteStore.removeFavorite(product.value.id, product.value.title)
  else favoriteStore.addFavorite(product.value.id, product.value.title)
}

// Related products (same city, exclude self)
const { data: allData } = useAllProducts()
const relatedProducts = computed(() => {
  if (!allData.value?.products || !product.value)
    return []
  return allData.value.products
    .filter(p => p.city === product.value!.city && p.id !== product.value!.id)
    .slice(0, 4)
})

useSeoMeta({
  title: () => product.value?.title || '商品詳情',
  ogImage: () => product.value?.imageUrl,
  description: () => product.value?.description,
})
</script>

<template>
  <div class="mx-auto px-4 py-8 max-w-[1296px]">
    <!-- Breadcrumb -->
    <UiBreadcrumbBreadcrumb class="mb-6">
      <UiBreadcrumbBreadcrumbItem>
        <NuxtLink to="/" class="hover:text-cc-primary">
          首頁
        </NuxtLink>
      </UiBreadcrumbBreadcrumbItem>
      <UiBreadcrumbBreadcrumbSeparator />
      <UiBreadcrumbBreadcrumbItem>
        <NuxtLink to="/products" class="hover:text-cc-primary">
          景點套票
        </NuxtLink>
      </UiBreadcrumbBreadcrumbItem>
      <UiBreadcrumbBreadcrumbSeparator />
      <UiBreadcrumbBreadcrumbItem>
        <span class="text-cc-black">{{ product?.title || "商品詳情" }}</span>
      </UiBreadcrumbBreadcrumbItem>
    </UiBreadcrumbBreadcrumb>

    <!-- Loading -->
    <div v-if="isLoading" class="py-20 flex items-center justify-center">
      <div class="i-material-symbols-progress-activity text-cc-primary h-8 w-8 animate-spin" />
    </div>

    <template v-else-if="product">
      <div class="flex flex-col gap-8 lg:flex-row">
        <!-- Left: Image Gallery -->
        <div class="lg:w-3/5">
          <ProductImageGallery
            :main-image="product.imageUrl"
            :images="product.imagesUrl"
            :alt="product.title"
          />
        </div>

        <!-- Right: Info (sticky on desktop) -->
        <div class="lg:w-2/5 lg:self-start lg:top-24 lg:sticky">
          <!-- Location -->
          <div class="text-sm text-cc-grey-9f flex gap-1 items-center">
            <div class="i-material-symbols-location-on-outline h-4 w-4" />
            {{ cityName }} · {{ product.address }}
          </div>

          <!-- Title -->
          <h1 class="text-h3 mt-2">
            {{ product.title }}
          </h1>

          <!-- Rating -->
          <UiRating :value="product.evaluate" :count="product.evaluateNum" class="mt-2" />

          <!-- Price -->
          <div class="mt-4 flex gap-3 items-baseline">
            <span class="text-h4 text-cc-accent font-bold">{{ currency(displayPrice) }}</span>
            <span
              v-if="displayOriginPrice > displayPrice"
              class="text-body text-cc-grey-9f line-through"
            >
              {{ currency(displayOriginPrice, "$") }}
            </span>
          </div>

          <!-- Description -->
          <p v-if="product.description" class="text-body text-cc-grey-66 mt-4">
            {{ product.description }}
          </p>

          <!-- Plan selection -->
          <div v-if="product.plans?.length" class="mt-6">
            <h3 class="text-body font-bold mb-3">
              方案選擇
            </h3>
            <div class="flex flex-col gap-3">
              <button
                v-for="(plan, idx) in product.plans"
                :key="idx"
                type="button"
                class="p-4 text-left border rounded-xl cursor-pointer transition"
                :class="
                  selectedPlanIndex === idx
                    ? 'border-cc-primary bg-cc-primary/5'
                    : 'border-cc-grey-e9 hover:border-cc-primary'
                "
                @click="selectedPlanIndex = idx"
              >
                <h4 class="text-body font-medium">
                  {{ plan.title }}
                </h4>
                <div class="text-xs text-cc-grey-66 mt-1" v-html="plan.content" />
                <div class="mt-2 flex gap-2 items-baseline">
                  <span class="text-body text-cc-accent font-bold">{{ currency(plan.price) }}</span>
                  <span
                    v-if="plan.origin_price > plan.price"
                    class="text-xs text-cc-grey-9f line-through"
                  >
                    {{ currency(plan.origin_price, "$") }}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <!-- Date picker -->
          <div class="mt-4">
            <label class="text-body font-medium mb-1 block">選擇日期</label>
            <input
              v-model="dateStr"
              type="date"
              class="text-body px-3 py-2 border border-cc-grey-d4 rounded-[5px] bg-white h-10 w-full ring-offset-white focus:(outline-none ring-2 ring-cc-primary ring-offset-2)"
            >
          </div>

          <!-- Quantity -->
          <div class="mt-4 flex gap-4 items-center">
            <span class="text-body font-medium">數量</span>
            <ProductQuantitySelector v-model="qty" />
          </div>

          <!-- Action buttons -->
          <div class="mt-6 flex gap-3">
            <button class="btn py-3 flex-1" :disabled="isAdding" @click="handleAddToCart">
              {{ isAdding ? "加入中..." : "加入購物車" }}
            </button>
            <button
              type="button"
              class="p-3 border border-cc-grey-d4 rounded-[5px] inline-flex transition-colors items-center justify-center hover:bg-cc-grey-f7"
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

          <!-- Accordion: content & features -->
          <UiAccordionAccordion type="multiple" :default-value="['content']" class="mt-6">
            <UiAccordionAccordionItem v-if="product.content" value="content">
              <UiAccordionAccordionTrigger>商品介紹</UiAccordionAccordionTrigger>
              <UiAccordionAccordionContent>
                <div
                  class="text-body text-cc-grey-66 [&_li]:mb-1 [&_ul]:pl-4 [&_ul]:list-disc [&_img]:max-w-full"
                  v-html="product.content"
                />
              </UiAccordionAccordionContent>
            </UiAccordionAccordionItem>
            <UiAccordionAccordionItem v-if="product.features" value="features">
              <UiAccordionAccordionTrigger>注意事項</UiAccordionAccordionTrigger>
              <UiAccordionAccordionContent>
                <div
                  class="text-body text-cc-grey-66 [&_li]:mb-1 [&_ul]:pl-4 [&_ul]:list-disc [&_img]:max-w-full"
                  v-html="product.features"
                />
              </UiAccordionAccordionContent>
            </UiAccordionAccordionItem>
          </UiAccordionAccordion>
        </div>
      </div>

      <!-- Related products -->
      <section v-if="relatedProducts.length" class="mt-16">
        <h2 class="text-h4 mb-6">
          你可能也會喜歡
        </h2>
        <div class="gap-4 grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3">
          <HomeProductCard v-for="p in relatedProducts" :key="p.id" :product="p" not-ranking />
        </div>
      </section>
    </template>

    <UiEmpty v-else description="找不到此商品" />
  </div>
</template>
