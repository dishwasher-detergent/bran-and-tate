<template>
  <div>
    <div v-if="data" class="mx-auto max-w-7xl h-full p-4">
      <div v-for="order in data" :key="order.id" class="w-full">
        <div class="flex flex-col">
          <div class="ring-1 ring-base-300 rounded-t-2xl p-4 flex flex-col md:flex-row items-start">
            <div class="flex flex-col flex-1">
              <p class="text-xs font-bold">Recieved At: {{ order.timestamp }}</p>
              <div class="flex flex-col md:flex-row pt-4">
                <div class="md:pr-8 bg-base-200 rounded-2xl p-4">
                  <h4 class="text-xs font-bold">Shipping</h4>
                  <p class="font-bold text-lg">{{ order.shipping.name }}</p>
                  <p>{{ order.shipping.address.line1 }}, {{ order.shipping.address.line2 }}</p>
                  <p>
                    {{ order.shipping.address.city }}, {{ order.shipping.address.state }}
                    {{ order.shipping.address.postal_code }}
                  </p>
                </div>
                <div class="mt-4 md:mt-0 md:ml-4 bg-base-200 rounded-2xl p-4">
                  <h4 class="text-xs font-bold">Contact</h4>
                  <p>{{ order.contact }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4 md:mt-0 bg-base-200 rounded-2xl p-4">
              <h4 class="text-xs font-bold">Status</h4>
              <h3 v-if="order.completed && !order.shipped" class="font-bold text-2xl">Crafted</h3>
              <h3 v-else-if="order.shipped" class="font-bold text-lg">Shipped</h3>
              <h3 v-else class="font-bold text-lg">Crafting</h3>
              <p v-if="order.shipped">{{ order.tracking }}</p>
            </div>
          </div>
          <div class="rounded-b-2xl ring-1 ring-base-300 p-4 space-y-6">
            <!-- Line Items -->
            <div v-for="item in lineItem" :key="item.id">
              <div v-if="item.order_id == order.order_id" class="flex w-full">
                <div class="flex-1">
                  <p class="font-bold text-lg">{{ item.item_name }}</p>
                  <p>Quantity: {{ item.quantity }}</p>
                </div>
                <div v-if="item.completed" class="flex flex-row">
                  <p>Crafted&nbsp;&nbsp;&nbsp;</p>
                  <div>
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: '',
      lineItem: '',
      subscription: null,
    }
  },
  created() {
    this.subscription = this.$supabase
      .from('products')
      .on('*', (payload) => {
        this.retrieve_orders()
        this.retrieve_lineItems()
      })
      .subscribe()
  },
  async mounted() {
    await this.retrieve_orders()
    await this.retrieve_lineItems()
  },
  async asyncData({ params }) {
    const slug = params.slug
    return { slug }
  },
  methods: {
    async retrieve_orders() {
      let { data: products, error } = await this.$supabase
        .from('orders')
        .select('*')
        .eq('order_id', this.slug)
      if (error) {
        console.error(error)
      } else {
        this.data = products
      }
    },
    async retrieve_lineItems() {
      let { data: products, error } = await this.$supabase
        .from('line_item')
        .select('*')
        .order('id', { ascending: false })
        .eq('order_id', this.slug)
      if (error) {
        console.error(error)
      } else {
        this.lineItem = products
      }
    },
  },
  beforeDestroy() {
    this.$supabase.removeSubscription(this.subscription)
  },
}
</script>