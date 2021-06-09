<template>
  <div>
    <nav
      ref="subnav"
      style="top: -1px"
      id="subnav"
      class="
        max-w-7xl
        mx-auto
        navbar
        bg-base-100
        ring-1 ring-base-300
        text-base-content
        rounded-box
        sticky
        top-0
        px-3
        z-50
      "
    >
      <div class="flex-1 w-full">
        <div class="form-control w-full md:mr-8">
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            class="input input-bordered bg-gray-50"
          />
        </div>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-hover dropdown-end">
          <div tabindex="0" class="m-1 btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </div>
          <ul
            class="
              ring-1 ring-base-300
              shadow
              menu
              dropdown-content
              bg-base-100
              rounded-box
              w-52
              p-2
            "
          >
            <div class="form-control">
              <label class="cursor-pointer label" v-for="sort in sort_list" :key="sort.id">
                <span class="label-text">{{ sort.title }}</span>
                <div>
                  <input
                    type="radio"
                    name="sort"
                    class="radio radio-primary"
                    :value="sort.value"
                    v-model="sorted"
                  />
                  <span class="radio-mark"></span>
                </div>
              </label>
            </div>
          </ul>
        </div>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-hover dropdown-end">
          <div tabindex="0" class="m-1 btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <ul
            class="
              ring-1 ring-base-300
              shadow
              menu
              dropdown-content
              bg-base-100
              rounded-box
              w-52
              p-2
            "
          >
            <div class="form-control">
              <label class="cursor-pointer label" v-for="type in types" :key="type.id">
                <span class="label-text">{{ type }}</span>
                <div>
                  <input
                    v-model="filter"
                    type="checkbox"
                    class="checkbox checkbox-primary"
                    name="type"
                    :value="type"
                  />
                  <span class="checkbox-mark"></span>
                </div>
              </label>
            </div>
          </ul>
        </div>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-hover dropdown-end">
          <button class="btn btn-square btn-ghost relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <div
              class="
                top-0
                right-0
                absolute
                px-1.5
                h-5
                flex
                items-center
                justify-center
                text-sm
                bg-red-500
                text-white text-bold
                rounded-full
              "
            >
              {{ cart.length }}
            </div>
          </button>
          <ul
            v-if="cart.length"
            class="
              ring-1 ring-base-300
              shadow
              menu
              dropdown-content
              bg-base-100
              rounded-box
              w-52
              p-2
            "
          >
            <div class="form-control">
              <div class="max-h-48 overflow-hidden overflow-y-auto">
                <div class="cursor-pointer label" v-for="item in cart" :key="item.id">
                  <div class="w-full py-2 px-4 rounded-2xl bg-gray-50">
                    <p class="flex w-full">
                      <span class="flex-none font-bold">{{ item.quantity }}</span>
                      <span class="px-1 truncate flex-1">{{ item.name }}</span>
                      <button
                        class="flex-none text-red-500 btn btn-ghost btn-square btn-xs"
                        @click="removeFromCart(item.id)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-2 pt-2 border-t border-base-300">
                <nuxt-link to="/cart" class="btn btn-primary w-full">Checkout</nuxt-link>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Products -->
    <section class="mt-4 w-full px-2 md:px-0 pb-16">
      <div
        v-if="products.length > 0"
        class="
          max-w-7xl
          mx-auto
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          items-center
          justify-items-center
          gap-5
        "
      >
        <ProductItem
          v-show="itemSearch(product) && itemFilter(product)"
          v-for="product in products"
          :key="product.id"
          :title="product.title"
          :description="product.description"
          :size="product.size"
          :colors="product.colors"
          :price="product.price"
          :id="product.id"
          :image="product.image"
        />
      </div>
      <div v-else>
        <ProductPlaceholders />
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
      types: [],
      sort_list: [
        {
          title: 'New to Old',
          value: 'new_to_old',
          order: {
            column: 'id',
            direction: true,
          },
        },
        {
          title: 'Old to New',
          value: 'old_to_new',
          order: {
            column: 'id',
            direction: false,
          },
        },
        {
          title: 'Price High to Low',
          value: 'price_high_to_low',
          order: {
            column: 'price',
            direction: true,
          },
        },
        {
          title: 'Price Low to High',
          value: 'price_low_to_high',
          order: {
            column: 'price',
            direction: false,
          },
        },
      ],
      sorted: 'new_to_old',
      cart: [],
      subscription: null,
    }
  },
  watch: {
    sorted: function (newVal, oldVal) {
      this.getProducts()
    },
  },
  created() {
    this.$store.commit('SET_CART')
    this.setCart()

    this.subscription = this.$supabase
      .from('products')
      .on('DELETE', (payload) => {
        this.getProducts()
      })
      .on('INSERT', (payload) => {
        this.getProducts()
      })
      .on('UPDATE', (payload) => {
        this.getProducts()
      })
      .subscribe()

    this.$store.watch(
      (state) => {
        return this.$store.state.cart
      },
      () => {
        this.setCart()
      }
    )
  },
  mounted() {
    this.getProducts()
    this.getTypes()
    this.getSticky()
  },
  methods: {
    removeFromCart(e) {
      let cart = this.cart
      let tempCart = []
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id != e) {
          tempCart.push(cart[i])
        }
      }
      this.$store.commit('REPLACE_CART', tempCart)
    },
    setCart() {
      if (localStorage.getItem('cart')) this.cart = JSON.parse(localStorage.getItem('cart'))
    },
    async getProducts() {
      let sort
      for (let i = 0; i < this.sort_list.length; i++) {
        if (this.sorted == this.sort_list[i].value) {
          sort = this.sort_list[i].order
          break
        }
      }

      let { data: products, error } = await this.$supabase
        .from('products')
        .select('*')
        .order(sort.column, { ascending: sort.direction })
      if (error) {
        console.error(error)
      } else {
        this.products = products
      }
    },
    async getTypes() {
      let { data: types, error } = await this.$supabase
        .from('types')
        .select('*')
        .eq('title', 'product_types')
      if (error) {
        console.error(error)
      } else {
        this.types = types[0].types
      }
    },
    itemSearch(e) {
      if (this.search.length > 0) {
        if (e.title.toLowerCase().includes(this.search.toLowerCase())) return true
      } else return true
    },
    itemFilter(e) {
      if (this.filter.length == 0) return true
      // if(this.filter.indexOf(e.type) > -1) return true
      let in_array = 0
      if (e.type == null) return
      for (let i = 0; i < this.filter.length; i++) {
        for (let j = 0; j < e.type.length; j++) {
          if (this.filter[i].toLowerCase().includes(e.type[j].toLowerCase())) in_array++
        }
      }
      if (in_array > 0) return true
    },
    getSticky() {
      const el = this.$refs.subnav
      const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle('is-pinned', e.intersectionRatio < 1),
        { threshold: [1] }
      )
      observer.observe(el)
    },
  },
  beforeDestroy() {
    this.$supabase.removeSubscription(this.subscription)
  },
}
</script>
<style scoped>
#subnav.is-pinned {
  border-radius: 0px 0px 1rem 1rem !important;
}
#subnav {
  transition: 0.25s;
}
</style>