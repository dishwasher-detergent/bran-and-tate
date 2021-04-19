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
          <NavItem>Location</NavItem>
        </div>
      </div>
    </nav>
    <Nuxt />
    <footer class="w-full h-48 absolute bottom-0 bg-gray-900"></footer>
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
    @apply text-gray-900;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
