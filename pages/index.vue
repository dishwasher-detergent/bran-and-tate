<template>
  <div>
    <div id="landing-banner" class="bg-gray-200 w-full h-96 flex items-center justify-center">
      <div class="h-full w-full flex items-center justify-center bg-gray-500 bg-opacity-10">
        <h1 class="font-bold text-7xl">Bran And Tate.</h1>
      </div>
    </div>
    <div class="w-full md:h-16 border-b border-gray-300 shadow sticky top-0 bg-white">
      <div class="mx-auto max-w-7xl px-5 h-full flex flex-col md:flex-row">
        <div class="w-full md:w-2/5 lg:w-1/2">
          <NavSearch 
            @sort="sorting"
          />
        </div>
        <div
          class="w-full md:w-3/5 lg:w-1/2 flex flex-row justify-center flex-wrap flex-nowrap md:justify-end space-between h-full pb-2 md:pb-0"
        >
          <NavSubItem type="Porch" value="Porch" @sort="alter_filter">Porch</NavSubItem>
          <NavSubItem type="Wall" value="Wall" @sort="alter_filter">Wall</NavSubItem>
          <NavSubItem type="Seasonal" value="Seasonal" @sort="alter_filter">Seasonal</NavSubItem>
          <NavSubItem type="cart">
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
        <ProductItem v-show="itemSearch(product) && itemFilter(product)" v-for="product in products" :key="product.id" 
          :title="product.title"
          :description="product.description"
          :size="product.size"
          :colors="product.colors"
          :price="product.price"
          :id="product.id"
          :image="product.image"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      search: '',
      filter: [],
      api: process.env.NUXT_ENV_API_URL
    };
  },
  async fetch(){
    // const product = await this.$content('shop.product').fetch()
    const product = await fetch(this.api + "/products").then((res) =>
      res.json()
    );
    console.log(product)
    this.products = product
  },
  methods:{
    sorting(e){
      this.search = e
    },
    alter_filter(e){
      const index = this.filter.indexOf(e.target.value.toLowerCase())
      if(index > -1){
        this.filter.splice(index, 1)
      } else {
        this.filter.push(e.target.value.toLowerCase())
      }
    },
    itemSearch(e){
      if(this.search.length > 0){
        if(e.title.toLowerCase().includes(this.search.toLowerCase())) return true
      } else
        return true
    },
    itemFilter(e){
      if(this.filter.length == 0) return true
      if(this.filter.indexOf(e.type) > -1) return true
    }
  }
}
</script>
<style scoped>
#landing-banner {
  background-image: url("~/assets/background.jpg");
  background-position: center;
  background-size: cover;
}
</style>