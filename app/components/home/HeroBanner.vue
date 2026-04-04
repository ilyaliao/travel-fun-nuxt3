<script setup lang="ts">
import { cityMap } from '~/constants'

const searchQuery = ref('')
const showDropdown = ref(false)
const searchContainer = ref<HTMLElement>()

const { data } = useAllProducts()

const products = computed(() => data.value?.products ?? [])

const hasInput = computed(() => searchQuery.value.length > 0)

const displayProducts = computed(() => {
  const q = searchQuery.value
  if (!q)
    return products.value
  return products.value.filter(({ title, city }) => title.match(q) || cityMap.get(city)?.match(q))
})

function onSearch() {
  showDropdown.value = false
  if (displayProducts.value.length > 0) {
    navigateTo(`/products/${displayProducts.value[0]!.id}`)
  }
  else if (searchQuery.value.trim()) {
    navigateTo({ path: '/products', query: { q: searchQuery.value } })
  }
}

function onFocus() {
  showDropdown.value = true
}

function onInput(e: Event) {
  searchQuery.value = (e.target as HTMLInputElement).value.trim()
}

onClickOutside(searchContainer, () => {
  showDropdown.value = false
})
</script>

<template>
  <div
    class="mb-12 px-3 py-8 flex h-[360px] w-full items-end relative z-10 bg-cover bg-center bg-no-repeat md:mb-5 lg:bg-[center_-100px]"
    style="background-image: url(/images/banner.jpg); overflow: visible"
  >
    <div
      class="text-white font-serif text-center w-full left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2"
      style="text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4)"
    >
      <div
        class="text-[28px] leading-[1.2] font-bold mb-4 flex flex-col justify-center sm:(text-5xl flex-row) lg:gap-6"
      >
        <span>旅遊趣</span>
        陪你去台灣各地
      </div>
      <h1 class="text-base leading-[1.2] font-bold sm:text-[28px]">
        讓我們帶著你一同欣賞台灣的美
      </h1>
    </div>
    <div
      ref="searchContainer"
      class="w-full relative md:(max-w-[640px] translate-y-1/2 bottom-0 left-1/2 absolute -translate-x-1/2)"
    >
      <div
        class="px-3 py-3 rounded-[5px] bg-white flex gap-2 shadow-[0_0_20px_0_black/20] items-center md:px-5"
      >
        <label for="hero-search" class="sr-only">搜尋目的地</label>
        <input
          id="hero-search"
          :value="searchQuery"
          type="text"
          class="text-cc-black outline-none border-0 flex-1 w-0 ring-0"
          autocomplete="off"
          placeholder="搜尋你想去的目的地 / 城市"
          @input="onInput"
          @focus="onFocus"
          @keyup.enter="onSearch"
        >
        <button
          type="button"
          class="text-white px-6 py-[10.5px] rounded-[5px] bg-cc-accent cursor-pointer focus-visible:(outline-none ring-2 ring-cc-primary/50)"
          @click.stop="onSearch"
        >
          搜尋
        </button>
      </div>
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-[-8px] scale-y-95 opacity-0"
        enter-to-class="translate-y-0 scale-y-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 scale-y-100 opacity-100"
        leave-to-class="translate-y-[-8px] scale-y-95 opacity-0"
      >
        <div
          v-if="showDropdown"
          class="mt-1 rounded-[5px] bg-white shadow-lg origin-top left-0 right-0 absolute z-50"
        >
          <div v-if="displayProducts.length > 0" class="max-h-[300px] overflow-y-auto">
            <NuxtLink
              v-for="{ id, title, city, imageUrl } in displayProducts"
              :key="id"
              :to="`/products/${id}`"
              class="px-4 py-3 flex gap-3 cursor-pointer transition-colors items-center hover:bg-cc-grey-f7"
              @click="showDropdown = false"
            >
              <img
                :src="imageUrl"
                :alt="title"
                class="rounded-[5px] shrink-0 h-10 w-10 object-cover"
              >
              <div>
                <p class="text-base text-cc-black font-bold">
                  {{ title }}
                </p>
                <div class="text-cc-grey-9f flex gap-1 items-center">
                  <div class="i-material-symbols-location-on-outline h-4 w-4" />
                  <span class="text-xs">{{ cityMap.get(city) }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div v-else-if="hasInput" class="py-8 flex flex-col gap-3 items-center">
            <div class="i-material-symbols-search-off text-cc-grey-d4 h-10 w-10" />
            <p class="text-sm text-cc-grey-9f">
              找不到符合的結果
            </p>
            <NuxtLink
              to="/products"
              class="text-sm text-cc-black px-4 py-2 border border-cc-black rounded-[5px] transition-colors hover:bg-cc-grey-f7"
              @click="showDropdown = false"
            >
              前往商品頁面
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
