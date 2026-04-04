<script setup lang="ts">
import { currency } from '~/utils/currency'

const route = useRoute()
const id = computed(() => route.params.id as string)
const { data, isLoading } = useProduct(id)

const product = computed(() => data.value?.product)

useSeoMeta({
  title: () => product.value?.title || '商品詳情',
})
</script>

<template>
  <div class="max-w-cc-width mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <UiBreadcrumbBreadcrumb class="mb-6">
      <UiBreadcrumbBreadcrumbItem>
        <NuxtLink to="/" class="hover:text-cc-primary">
          首頁
        </NuxtLink>
      </UiBreadcrumbBreadcrumbItem>
      <UiBreadcrumbBreadcrumbSeparator />
      <UiBreadcrumbBreadcrumbItem>
        <span class="text-cc-black">{{ product?.title || "商品詳情" }}</span>
      </UiBreadcrumbBreadcrumbItem>
    </UiBreadcrumbBreadcrumb>

    <div v-if="isLoading" class="py-20 flex items-center justify-center">
      <div class="i-material-symbols-progress-activity text-cc-primary h-8 w-8 animate-spin" />
    </div>

    <div v-else-if="product" class="gap-8 grid lg:grid-cols-2">
      <!-- Left: Images -->
      <div>
        <div class="rounded-xl overflow-hidden">
          <NuxtImg :src="product.imageUrl" :alt="product.title" class="img-cover aspect-[4/3]" />
        </div>
        <div v-if="product.imagesUrl?.length" class="mt-4 gap-2 grid grid-cols-4">
          <div
            v-for="(img, idx) in product.imagesUrl"
            :key="idx"
            class="rounded-lg overflow-hidden"
          >
            <NuxtImg
              :src="img"
              :alt="`${product.title} ${idx + 1}`"
              class="img-cover aspect-square"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <!-- Right: Info -->
      <div>
        <div class="text-area-title text-cc-grey-9f flex gap-2 items-center">
          <div class="i-material-symbols-location-on-outline h-4 w-4" />
          {{ product.city }} · {{ product.address }}
        </div>
        <h1 class="text-h3 mt-2">
          {{ product.title }}
        </h1>
        <UiRating :value="product.evaluate" :count="product.evaluateNum" class="mt-2" />

        <div class="mt-4 flex gap-3 items-baseline">
          <span class="text-h4 text-cc-accent font-bold">{{ currency(product.price) }}</span>
          <span
            v-if="product.origin_price > product.price"
            class="text-body text-cc-grey-9f line-through"
          >
            {{ currency(product.origin_price, "$") }}
          </span>
        </div>

        <p v-if="product.description" class="text-body text-cc-grey-66 mt-4">
          {{ product.description }}
        </p>

        <!-- Plans -->
        <div v-if="product.plans?.length" class="mt-6">
          <h3 class="text-h5 mb-3">
            方案選擇
          </h3>
          <div class="flex flex-col gap-3">
            <div
              v-for="(plan, idx) in product.plans"
              :key="idx"
              class="p-4 border border-cc-grey-e9 rounded-xl transition hover:border-cc-primary"
            >
              <h4 class="text-body font-medium">
                {{ plan.title }}
              </h4>
              <p class="text-xs text-cc-grey-66 mt-1">
                {{ plan.content }}
              </p>
              <div class="mt-2 flex gap-2 items-baseline">
                <span class="text-body text-cc-accent font-bold">{{ currency(plan.price) }}</span>
                <span
                  v-if="plan.origin_price > plan.price"
                  class="text-xs text-cc-grey-9f line-through"
                >
                  {{ currency(plan.origin_price, "$") }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Add to cart button -->
        <button class="btn mt-6 py-3 w-full">
          加入購物車
        </button>
      </div>
    </div>

    <UiEmpty v-else description="找不到此商品" />
  </div>
</template>
