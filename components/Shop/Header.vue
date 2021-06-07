<template>
  <nav class="w-full md:h-20 bg-base-100 border-b border-base-300 relative z-10 ">
    <div
      class="mx-auto max-w-7xl h-full px-5 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center md:justify-items-stretch"
    >
      <nuxt-link to="/" class="py-2">
        <NavLogo />
      </nuxt-link>
      <div class="flex flex-row items-center justify-end space-between h-16 md:h-full">
        <nuxt-link to="/" class="btn btn-ghost">Shop</nuxt-link>
        <div class="dropdown dropdown-hover dropdown-end">
          <div tabindex="0" class="m-1 btn btn-ghost">Location</div>
          <ul
            class="ring-1 ring-base-300 shadow menu dropdown-content bg-base-100 rounded-box w-52 p-2"
          >
            <h1 class="bg-gray-50 rounded-2xl font-bold text-center">MainStreet MarketPlace</h1>
            <p class="mt-2 text-sm w-full text-center"><b>Address</b></p>
            <p class="text-left text-sm">429 W Main St, Yukon, OK 73099</p>
            <p class="mt-2 text-sm w-full text-center"><b>Time</b></p>
            <div class="text-left text-sm flex flex-col">
              <div class="flex justify-between">
                <p>Friday</p>
                <p>10AM–5:30PM</p>
              </div>
              <div class="flex justify-between">
                <p>Saturday</p>
                <p>10AM–4PM</p>
              </div>
              <div class="flex justify-between">
                <p>Sunday</p>
                <p>Closed</p>
              </div>
              <div class="flex justify-between">
                <p>Monday</p>
                <p>10AM–5:30PM</p>
              </div>
              <div class="flex justify-between">
                <p>Tuesday</p>
                <p>10AM–5:30PM</p>
              </div>
              <div class="flex justify-between">
                <p>Wednesday</p>
                <p>10AM–5:30PM</p>
              </div>
              <div class="flex justify-between">
                <p>Thursday</p>
                <p>10AM–5:30PM</p>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>