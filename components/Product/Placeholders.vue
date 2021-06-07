<template>
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-items-center gap-5">
    <div
      v-for="place in placeholders"
      :key="place.id"
      class="w-80 xl:w-72 rounded-2xl ring-1 ring-base-300 overflow-hidden"
    >
      <div
        class="w-full h-72 bg-gray-100 flex items-center justify-center overflow-hidden relative z-10"
      ></div>
      <div
        class="h-72 rounded-2xl -mt-10 py-5 flex flex-col relative bg-gray-50 z-20 ring-1 ring-base-300"
      >
        <div class="h-full w-full px-4 overflow-y-hidden flex-1 mb-4 space-y-4">
          <div class="w-full h-6 bg-gray-100 rounded-2xl"></div>
          <div class="w-1/4 h-10 bg-gray-100 rounded-2xl"></div>
          <div class="w-full h-20 bg-gray-100 rounded-2xl"></div>
        </div>
        <div class="w-full flex items-center justify-center px-4 flex-none">
          <button aria-label="Disabled" disabled="disabled" class="btn w-full btn-primary loading">
            Loading
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      placeholders: [1, 2, 3, 4, 5, 6],
    }
  },
}
</script>