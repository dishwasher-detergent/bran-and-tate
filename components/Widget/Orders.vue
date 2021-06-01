<template>
  <WidgetContainer>
    <button @click="retrieve_orders" class="btn btn-primary">Fetch Orders</button>
    {{ data }}
  </WidgetContainer>
</template>
<script>
export default {
  data() {
    return {
      data: null,
    }
  },
  async mounted() {
    await this.retrieve_orders()
  },
  methods: {
    async retrieve_orders() {
      const { data } = await this.$axios.post('/api/orders')
      this.data = data
    },
  },
}
</script>