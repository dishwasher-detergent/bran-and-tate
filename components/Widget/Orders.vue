<template>
  <div class="flex flex-col w-full space-y-4">
    <nav ref="subnav" style="top:-1px;" id="subnav" class="w-full navbar bg-white ring-1 ring-gray-300 text-neutral-content rounded-box px-3 z-20 justify-end">
      <div class="flex-none">
        <div class="dropdown dropdown-hover dropdown-end">
          <div tabindex="0" class="m-1 btn btn-square btn-ghost text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div> 
          <ul class="ring-1 ring-gray-300 shadow menu dropdown-content bg-base-100 rounded-box w-52 p-2">
            <div class="form-control">
              <label class="cursor-pointer label" v-for="sort in sort_list" :key="sort.id">
                <span class="label-text">{{sort.title}}</span> 
                <div>
                  <input type="radio" name="sort" class="radio radio-primary" :value="sort.value" v-model="sorted"> 
                  <span class="radio-mark"></span>
                </div>
              </label>
            </div>
          </ul>
        </div>
      </div> 
      <div class="flex-none">
        <div class="dropdown dropdown-hover dropdown-end">
          <div tabindex="0" class="m-1 btn btn-square btn-ghost text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>  
          </div> 
          <ul class="ring-1 ring-gray-300 shadow menu dropdown-content bg-base-100 rounded-box w-52 p-2">
            <div class="form-control">
              <label class="cursor-pointer label" v-for="type in types" :key="type.id">
                <span class="label-text">{{type}}</span> 
                <div>
                  <input v-model="filter" type="radio" class="radio radio-primary" name="type" :value="(type == 'open' ? 'false' : 'true')"> 
                  <span class="radio-mark"></span>
                </div>
              </label>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    <WidgetContainer>
      <div v-for="order in data" :key="order.id" class="mb-4">
        <div class="flex flex-col">
          <div :class="(order.completed ? 'bg-green-100' : 'bg-gray-100') + ' ring-1 ring-gray-300 rounded-t-2xl p-4 flex flex-col md:flex-row'">
            <div class="flex flex-col flex-1">
              <p class="text-gray-600 text-xs font-bold">Order # {{order.id}}</p>
              <p class="font-bold text-lg">{{order.shipping.name}}</p>
              <p>{{order.shipping.address.line1}}, {{order.shipping.address.line2}}</p>
              <p>{{order.shipping.address.city}}, {{order.shipping.address.state}} {{order.shipping.address.postal_code}}</p>
            </div>
            <div v-if="order.completed" class="flex items-center justify-center">
              <h3 class="font-bold text-2xl text-green-600">Completed</h3>
            </div>
          </div>
          <div class="rounded-b-2xl ring-1 ring-gray-300 p-4 space-y-6">
            <!-- Line Items -->
            <div v-for="item in lineItem" :key="item.id">
              <div v-if="item.order_id == order.order_id" class="flex w-full">
                <div class="flex-1">
                  <p class="font-bold text-xl">{{item.item_name}}</p>
                  <p>Quantity: {{item.quantity}}</p>
                </div>
                <div class="flex-none">
                  <button v-if="item.completed" class="btn btn-error btn-square" @click="complete_item(item.id, false)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button v-else class="btn btn-success btn-square" @click="complete_item(item.id, true)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="data.length == 0">
        <h2 class="font-bold text-center text-2xl">There are no incomplete orders.</h2>
      </div>
    </WidgetContainer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: '',
      lineItem: '',
      types: [],
      filter: false,
      sort_list: [
        {
          title: 'New to Old',
          value: 'new_to_old',
          order: {
            column: 'id',
            direction: true
          }
        },
        {
          title: 'Old to New',
          value: 'old_to_new',
          order: {
            column: 'id',
            direction: false
          }
        }
      ],
      sorted: 'new_to_old',
    }
  },
  async mounted() {
    await this.retrieve_orders()
    await this.retrieve_lineItems()
    await this.getTypes()
  },
  created(){
    this.$supabase
    .from('line_item')
    .on('UPDATE', payload => {
      this.check_completed(payload.new.order_id)
      this.retrieve_lineItems()
    })
    .subscribe()

    this.$supabase
    .from('orders')
    .on('INSERT', payload => {
      this.retrieve_orders()
    })
    .on('UPDATE', payload => {
      this.retrieve_orders()
    })
    .subscribe()
  },
  watch: {
  	'sorted': function(newVal, oldVal) {
    	this.retrieve_orders()
      this.retrieve_lineItems()
    },
  	'filter': function(newVal, oldVal) {
    	this.retrieve_orders()
    }
  },
  methods: {
    async retrieve_orders() {
      let sort;
      for(let i = 0; i < this.sort_list.length; i++){
        if(this.sorted == this.sort_list[i].value){
          sort = this.sort_list[i].order
          break;
        }
      }

      let { data: products, error } = await this.$supabase
        .from('orders')
        .select('*')
        .order(sort.column,{ascending: sort.direction})
        .eq('completed',this.filter)
        if(error){
          console.error(error)
        } else {
          this.data = products
        }
    },
    async retrieve_lineItems(){
        let { data: products, error } = await this.$supabase
        .from('line_item')
        .select('*')
        .order('id',{ascending: false})
        if(error){
          console.error(error)
        } else {
          this.lineItem = products
        }
    },
    async getTypes(){
      let { data: types, error } = await this.$supabase
        .from('types')
        .select('*')
        .eq("title","order_types")
        if(error){
          console.error(error)
        } else {
          this.types = types[0].types
        }
    },
    async complete_item(id, state){
      const { data, error } = await this.$supabase
      .from('line_item')
      .update({ completed: state })
      .eq('id', id)
    },
    async check_completed(id){
      let completed = await this.completed(id)
      let uncompleted = await this.uncompleted(id)

      if(completed.length > 0){
        if(completed.length == uncompleted.length){
          this.complete_order(id,true)
        } else {
          this.complete_order(id,false)
        }
      }

    },
    async uncompleted(id){
      let { data: products, error } = await this.$supabase
      .from('line_item')
      .select('*')
      .eq("order_id",id)
      return products
    },
    async completed(id){
      let { data: products, error } = await this.$supabase
      .from('line_item')
      .select('*')
      .eq("order_id",id)
      .eq("completed",true)

      return products
    },
    async complete_order(id,state){
      const { data, error } = await this.$supabase
      .from('orders')
      .update({ completed: state })
      .eq('order_id', id)
    }
  },
}
</script>