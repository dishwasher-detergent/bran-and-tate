<template>
  <div class="min-h-screen pb-56 relative bg-gray-50">
    <nav
      class="w-full md:h-20 bg-white shadow border-b border-gray-300 relative z-10"
    >
      <div
        class="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center md:justify-items-stretch"
      >
        <NavLogo />
        <div class="flex flex-row justify-end space-between h-16 md:h-full">
          <NavItem type="link" link="/">Shop</NavItem>
          <NavItem>About</NavItem>
          <NavItem type="drop">Location</NavItem>
        </div>
      </div>
    </nav>
    <Nuxt />
    <footer class="w-full h-48 absolute bottom-0 bg-gray-900"></footer>
  </div>
</template>
<script>
export default {
}
</script>
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
    @apply text-gray-900;
}
h1 {
  font-family: 'Playfair Display', serif;
}
</style>
