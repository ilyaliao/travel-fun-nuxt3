<template>
  <section class="py-20 relative overflow-hidden">
    <!-- Background -->
    <div class="inset-0 absolute">
      <NuxtImg src="/images/banner/banner_1.png" alt="" class="img-cover" loading="lazy" />
      <div class="bg-cc-black/50 inset-0 absolute" />
    </div>

    <!-- Content -->
    <div class="mx-auto px-4 text-center max-w-lg relative z-10">
      <div class="px-8 py-10 rounded-xl bg-cc-black/60 backdrop-blur-sm">
        <div class="i-material-symbols-accessibility-new text-white mx-auto mb-4 h-10 w-10" />
        <h2 class="text-h4 text-white">
          帶著感激與期待，讓我們踏上旅程！
        </h2>
        <p class="text-body text-white/70 mt-3">
          當人們去旅行時，他們不僅僅是去看風景，更是去體驗不同的文化和風土人情，開拓視野和擴大人脈，旅行可以帶給人們豐富的體驗和回憶
        </p>
        <NuxtLink
          to="/login"
          class="rounded-m text-btn text-white mt-6 px-6 py-2.5 bg-cc-primary inline-block hover:bg-cc-primary/90"
        >
          成為會員
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
