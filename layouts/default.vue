<template>
  <div class="flex flex-col h-screen relative bg-white" data-theme="bt">
    <ShopHeader />
      <Nuxt />
    <ShopFooter />
  </div>
</template>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    @apply text-gray-800;
}
footer {
  margin-top: auto;
}
h1 {
  font-family: 'Playfair Display', serif;
}
</style>
