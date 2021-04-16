<template>
  <div class="min-h-screen pb-48 relative bg-gray-50">
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
          <NavSearch 
            @sort="sorting"
          />
        </div>
        <div
          class="w-full flex flex-row justify-center md:justify-end space-between h-full pb-2 md:pb-0"
        >
          <NavSubItem type="Porch" @sort="sorting">Porch</NavSubItem>
          <NavSubItem type="Wall" @sort="sorting">Wall</NavSubItem>
          <NavSubItem type="Seasonal" @sort="sorting">Seasonal</NavSubItem>
          <NavSubItem>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div class="top-0 right-0 absolute px-1.5 h-5 flex items-center justify-center text-sm bg-red-500 text-white text-bold rounded-full ">{{$store.state.cart.length}}</div>
          </NavSubItem>
        </div>
      </div>
    </div>
    <div class="w-full py-10">
      <div
        class="max-w-7xl px-5 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-items-center gap-5"
      >
        <ProductItem v-show="product.type.toLowerCase().includes(search.toLowerCase())" v-for="product in products" :key="product.id" 
          :title="product.title"
          :description="product.description"
          :size="product.size"
          :colors="product.colors"
          :price="product.price"
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
      products: [],
      search: '',
    };
  },
  async fetch(){
    const product = await this.$content('shop.product').fetch()
    this.products = product.product
  },
  methods:{
    sorting(e){
      console.log(e)
      this.search = e
    }
  }
}
</script>