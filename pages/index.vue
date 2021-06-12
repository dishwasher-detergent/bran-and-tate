<template>
  <div class="px-4 md:px-0 space-y-4">
    <div class="bg-base-200 py-4 space-y-4 border-b border-base-300">
      <BannersBanner />
      <section class="max-w-7xl mx-auto h-96 flex items-center justify-center">
        <div
          class="
            w-full
            h-full
            relative
            bg-gray-50
            flex
            items-center
            justify-center
            rounded-2xl
            overflow-hidden
            ring-1 ring-base-300
          "
        >
          <div
            class="
              h-full
              p-6
              absolute
              md:relative
              top-0
              left-0
              flex flex-col flex-1
              items-center
              justify-center
              bg-yellow-100 bg-opacity-90
              md:bg-opacity-100
              z-10
              text-center
            "
          >
            <h1 class="w-full font-black text-7xl lg:text-8xl">Bran & Tate Co.</h1>
            <h2 class="w-full text-xl lg:text-2xl">Creating Unique Decor for your Home.</h2>
          </div>
          <div
            id="landing-banner"
            class="h-full w-full md:w-2/5 absolute md:relative top-0 left-0 flex-none"
          ></div>
        </div>
      </section>
    </div>
    <!-- Sub Nav Bar -->
    <ShopContent />
  </div>
</template>

<style scoped>
#landing-banner {
  background-image: url('~/assets/summer.jpg');
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
