<template>
	<div class="p-4 flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0">
    <div
      class="p-4 ring-1 ring-gray-300 rounded-xl overflow-hidden bg-white w-full"
    >
		{{data}}
    </div>
</div>
</template>
<script>
export default {
	data(){
		return{
			data: null
		}
	},
	async mounted(){
		await this.retrieve_orders()
	},
	methods:{
		async retrieve_orders() {
			const { data } = await this.$axios.post("/api/orders");
			this.data = data
	},
	}
}
</script>