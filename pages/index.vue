<template>
  <div class="min-h-screen pb-48 relative">
    <nav
      class="w-full md:h-20 bg-white shadow border-b border-gray-300 relative z-10"
    >
      <div
        class="mx-auto max-w-7xl px-5 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center md:justify-items-stretch"
      >
        <NavLogo />
        <div class="flex flex-row justify-end space-between h-16 md:h-full">
          <NavItem>Shop</NavItem>
          <NavItem>About</NavItem>
          <NavItem>Location</NavItem>
        </div>
      </div>
    </nav>
    <div class="bg-red-200 w-full h-96"></div>
    <div class="w-full md:h-16 border-b border-gray-300 shadow sticky top-0 bg-white">
      <div class="mx-auto max-w-7xl px-5 h-full flex flex-col md:flex-row">
        <div class="w-full">
          <NavSearch />
        </div>
        <div
          class="w-full flex flex-row justify-center md:justify-end space-between h-full pb-2 md:pb-0"
        >
          <NavItem>Porch</NavItem>
          <NavItem>Wall</NavItem>
          <NavItem>Seasonal</NavItem>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 w-full py-10">
      <div
        class="max-w-7xl px-5 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-items-center gap-5"
      >
        <ProductItem v-for="product in products" :key="product.id" 
          :title="product.title"
          :description="product.description"
          :size="product.size"
          :colors="product.colors"
        />
      </div>
    </div>
    <footer class="w-full h-48 absolute bottom-0 bg-gray-900"></footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: []
    };
  },
  async fetch(){
    const product = await this.$content('shop.product').fetch()
    this.products = product.product
  },
}
</script>