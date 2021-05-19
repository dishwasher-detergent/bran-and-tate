<template>
  <div class="px-8">
    <BannersBanner/>
    <div class="w-full h-96 flex items-center justify-center pt-6">
      <div id="landing-banner" class="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl overflow-hidden ring-1 ring-gray-300">
        <div class="h-full w-full flex items-center justify-center bg-gray-500 bg-opacity-10">
          <h1 class="font-bold text-7xl md:text-9xl text-center">Bran & Tate Co.</h1>
        </div>
      </div>
    </div>
    <div class="sticky top-0 pt-6 z-50">
      <div class="w-full md:h-16 ring-1 ring-gray-300 rounded-xl bg-white">
        <div class="mx-auto max-w-7xl h-full grid grid-cols-3">
          <div class="w-full col-span-2">
            <NavSearch 
              @sort="sorting"
            />
          </div>
          <div
            class="w-full flex flex-row justify-center md:justify-end space-between h-full md:pb-0 "
          >
          <NavSubItem type="drop">
              <template v-slot:icon>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
              </template>
              <template v-slot:content>
                <div class="w-full h-full overflow-y-auto flex flex-col">
                  <NavSubItem type="Porch" value="Porch" @sort="alter_filter">Porch</NavSubItem>
                  <NavSubItem type="Wall" value="Wall" @sort="alter_filter">Wall</NavSubItem>
                  <NavSubItem type="Seasonal" value="Seasonal" @sort="alter_filter">Seasonal</NavSubItem>
                </div>
              </template>
            </NavSubItem>
            <NavSubItem type="cart">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div class="top-0 right-0 absolute px-1.5 h-5 flex items-center justify-center text-sm bg-red-500 text-white text-bold rounded-full ">{{$store.state.cart.length}}</div>
            </NavSubItem>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full py-10">
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
