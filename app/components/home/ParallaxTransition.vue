<template>
  <section class="h-[400px] relative overflow-hidden lg:h-[500px]">
    <!-- Background with parallax effect -->
    <div
      class="inset-0 absolute bg-cover bg-fixed bg-center"
      style="background-image: url(&quot;/images/banner/banner_1.png&quot;)"
    >
      <div class="bg-white/30 inset-0 absolute" />
    </div>

    <!-- Watermark text -->
    <div
      class="text-[6rem] text-cc-black/5 leading-none font-bold bottom-8 left-4 absolute lg:(text-[10rem] left-8)"
    >
      TRAVEL THE WORLD
    </div>

    <!-- Center content -->
    <div class="flex h-full items-center justify-center relative z-10">
      <h2 class="text-h1 text-cc-black/80 lg:text-[4rem]">
        Hello Taiwan
      </h2>
    </div>
  </section>
</template>
