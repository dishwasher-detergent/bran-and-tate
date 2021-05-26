<template>
  <div class="px-8">
    <BannersBanner/>
    <section class="w-full h-96 flex items-center justify-center pt-6">
      <div id="landing-banner" class="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl overflow-hidden ring-1 ring-gray-300">
        <div class="h-full w-full flex items-center justify-center bg-gray-500 bg-opacity-10">
          <h1 class="font-bold text-7xl md:text-9xl text-center">Bran & Tate Co.</h1>
        </div>
      </div>
    </section>
    <!-- Sub Nav Bar -->
    <nav class="navbar mb-2 bg-white ring-1 ring-gray-300 text-neutral-content rounded-box sticky top-0 mt-6 px-3 z-50">
      <div class="flex-1">
        <div class="form-control w-full md:mr-8">
          <input v-model="search" type="text" placeholder="Search" class="input input-bordered bg-gray-100 text-gray-900">
        </div>
      </div> 
      <div class="flex-none">
        <div class="dropdown dropdown-hover dropdown-end">
          <div tabindex="0" class="m-1 btn btn-square btn-ghost text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>  
          </div> 
          <ul class="ring-1 ring-gray-300 shadow menu dropdown-content bg-base-100 rounded-box w-52 text-gray-900 p-2">
            <div class="form-control">
              <label class="cursor-pointer label" v-for="type in types" :key="type.id">
                <span class="label-text">{{type}}</span> 
                <div>
                  <input v-model="filter" type="checkbox" class="checkbox checkbox-primary" name="type" :value="type"> 
                  <span class="checkbox-mark"></span>
                </div>
              </label>
            </div>
          </ul>
        </div>
      </div>
      <div class="flex-none">
        <nuxt-link to="/cart" class="btn btn-square btn-ghost relative text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <div class="top-0 right-0 absolute px-1.5 h-5 flex items-center justify-center text-sm bg-red-500 text-white text-bold rounded-full ">{{$store.state.cart.length}}</div>
        </nuxt-link>
      </div> 
    </nav>
    <!-- Products -->
    <section class="w-full py-10">
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-items-center gap-5"
      >
        <ProductItem v-show="itemSearch(product) && itemFilter(product)" v-for="product in products" :key="product.id" 
          :title="product.title"
          :description="product.description"
          :size="product.size"
          :colors="product.colors"
          :price="product.price"
          :id="product.id"
        />
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      search: '',
      filter: [],
      types: []
    };
  },
  created(){
    this.$store.commit('SET_CART')
    this.$supabase
    .from('products')
    .on('DELETE', payload => {
      this.getProducts()
    })
    .on('INSERT', payload => {
      this.getProducts()
    })
    .on('UPDATE', payload => {
      this.getProducts()
    })
    .subscribe()
  },
  mounted(){
    this.getProducts()
    this.getTypes()
  },
  methods:{
    async getProducts(){
      let { data: products, error } = await this.$supabase
        .from('products')
        .select('*')
        if(error){
          console.error(error)
        } else {
          this.products = products
        }
    },
    async getTypes(){
      let { data: types, error } = await this.$supabase
        .from('types')
        .select('*')
        .eq("title","product_types")
        if(error){
          console.error(error)
        } else {
          this.types = types[0].types
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
      // if(this.filter.indexOf(e.type) > -1) return true
      let in_array = 0;
      if(e.type == null) return
      for(let i = 0; i < this.filter.length; i++){
        for(let j = 0; j < e.type.length; j++){
          if(this.filter[i].toLowerCase().includes(e.type[j].toLowerCase())) in_array++
        }
      }
      if(in_array > 0) return true
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
