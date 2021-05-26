<template>
  <div class="min-h-screen pb-96 relative bg-white" data-theme="light">
    <nav
      class="w-full md:h-20 bg-white shadow border-b border-gray-300 relative z-10"
    >
      <div
        class="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center md:justify-items-stretch"
      >
        <NavLogo />
        <div class="flex flex-row items-center justify-end space-between h-16 md:h-full">
          <nuxt-link to="/" class="btn btn-ghost">Shop</nuxt-link>
          <div class="dropdown dropdown-hover dropdown-end">
            <div tabindex="0" class="m-1 btn btn-ghost text-gray-900">Location</div>
            <ul class="ring-1 ring-gray-300 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-gray-900 p-2">
                <h1 class="bg-gray-100 rounded-xl font-bold">MainStreet MarketPlace</h1>
                <p class="mt-2 text-sm w-full text-center"><b>Address</b></p>
                <p class="text-left text-sm">429 W Main St, Yukon, OK 73099</p>
                <p class="mt-2 text-sm w-full text-center"><b>Time</b></p>
                <div class="text-left text-sm flex flex-col">
                  <div class="flex justify-between"><p>Friday</p><p>10AM–5:30PM</p></div>
                  <div class="flex justify-between"><p>Saturday</p><p>10AM–4PM</p></div>
                  <div class="flex justify-between"><p>Sunday</p><p>Closed</p></div>
                  <div class="flex justify-between"><p>Monday</p><p>10AM–5:30PM</p></div>
                  <div class="flex justify-between"><p>Tuesday</p><p>10AM–5:30PM</p></div>
                  <div class="flex justify-between"><p>Wednesday</p><p>10AM–5:30PM</p></div>
                  <div class="flex justify-between"><p>Thursday</p><p>10AM–5:30PM</p></div>
                </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <Nuxt />
    <footer class="text-gray-600 bg-gray-50 border-t border-gray-300 body-font absolute bottom-0 w-full">
      <div class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <NavLogo />
            <span class="ml-3 text-xl">Bran & Tate</span>
          </a>
          <p class="mt-2 text-sm text-gray-500">Custom Home Decor</p>
        </div>
        <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div class="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Admin</h2>
            <nav class="list-none mb-10">
              <li v-if="this.$auth.loggedIn">
                <nuxt-link to="/Dashboard" class="text-gray-600 hover:text-gray-800">Dashboard</nuxt-link>
              </li>
              <li v-if="this.$auth.loggedIn">
                <nuxt-link to="/Login?type=signOut" class="text-gray-600 hover:text-gray-800">Log Out</nuxt-link>
              </li>
              <li v-else>
                <nuxt-link to="/Login" class="text-gray-600 hover:text-gray-800">Log In</nuxt-link>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div class="bg-gray-100">
        <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p class="text-gray-500 text-sm text-center sm:text-left">© 2021 Bran And Tate LLC —
            <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@branandtate</a>
          </p>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
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
