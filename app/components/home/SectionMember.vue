<template>
  <div
    class="grid w-full place-items-center relative bg-cover bg-center bg-no-repeat md:h-[600px]"
    style="
      background-image:
        linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/images/member.jpg);
    "
  >
    <div
      class="text-white px-10 py-6 text-center bg-cc-overlay flex flex-col gap-4 items-center md:max-w-[636px]"
    >
      <div class="i-material-symbols-escalator-warning text-white h-10 w-10" />
      <h4 class="text-[24px] leading-[1.2] font-bold font-serif">
        帶著感激與期待，讓我們踏上旅程！
      </h4>
      <p class="text-[14px] leading-5 text-center">
        當人們去旅行時，他們不僅僅是去看風景，更是去體驗不同的文化和風土人情，開拓視野和擴大人脈，旅行可以帶給人們豐富的體驗和回憶
      </p>
      <NuxtLink
        to="/login"
        class="text-[14px] text-white font-bold px-6 py-3 rounded-[5px] bg-cc-primary inline-flex cursor-pointer transition-colors duration-300 items-center justify-center hover:bg-cc-accent"
      >
        成為會員
      </NuxtLink>
    </div>
  </div>
</template>
