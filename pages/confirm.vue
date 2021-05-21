<template>
<div>
	<div class="mx-auto max-w-7xl px-5 h-full pt-10">
		<div>
			<h1 class="font-bold text-3xl pb-10">{{items.length}} Product(s) Purchased!</h1>
		</div>
		<div class="w-full p-2 mb-6 rounded-xl flex flex-col md:flex-row ring-1 ring-gray-300 bg-white" v-for="item in items" :key="item.id">
			<div class="h-48 w-full md:w-48 flex-none rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden">
				<ProductImg :id="item.id"/>
			</div>
			<div class="w-full flex flex-row py-5 md:pt-5">
				<div class="px-5 space-y-2 w-full">
					<h1 class="text-2xl font-bold truncate">{{item.name}}</h1>
					<p>Color: {{item.color}}</p>
					<p>Price: ${{item.price}} Per</p>
					<p>Quantity: {{item.quantity}}</p>
					<p class="font-bold">Total Price: ${{item.price * item.quantity}}</p>
				</div>
				<div class="h-full w-10 flex-none flex justify-center">
					<button class="text-red-600" @click="removeFromCart(item.id)">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	data(){
		return{
			items: null
		}
	},
	async mounted(){
		await this.retrieve_lineitems()
	},
	methods:{
		async retrieve_lineitems() {
			const { session_id = null } = this.$route.query;
			const { data } = await this.$axios.post("/api/lineitems", {
				id: session_id
			});
			this.items = data.data
	},
	}
}
</script>