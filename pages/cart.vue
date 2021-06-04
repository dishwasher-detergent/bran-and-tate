<template>
<div>
	<div class="mx-auto max-w-7xl px-5 h-full pt-10">
		<div>
			<h1 class="font-bold text-3xl pb-10">{{cart.length}} Product(s) in your Cart</h1>
		</div>
		<div v-if="cart.length == 0" class="w-full h-96 p-5 mb-6 rounded-2xl flex items-center justify-center ring-1 ring-gray-300 bg-white">
			<h2 class="font-bold text-3xl text-center">There seems to be nothing in your cart, yet!</h2>
		</div>
		<div v-else class="w-full p-2 mb-6 rounded-2xl flex flex-col md:flex-row ring-1 ring-gray-300 bg-white" v-for="item in cart" :key="item.id">
			<div class="h-48 w-full md:w-48 flex-none rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden">
				<ProductImg :id="item.image"/>
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
					<button aria-label="Remove From Cart" class="text-red-600" @click="removeFromCart(item.id)">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
					</button>
				</div>
			</div>
		</div>
		<div v-if="cart.length">
			<p class="w-full text-right text-2xl font-bold py-5">Subtotal: ${{total}}</p>
			<div class="flex items-center justify-end">
				<button aria-label="Check Out" class="btn btn-primary" @click="stripe_checkout">
					Check out
				</button>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	data(){
		return{
			total: 0,
			cart: [],
			stripe: null,
		}
	},
	created(){
		this.setCart()
		this.calculatePrice()
		this.$store.watch(
			(state)=>{
				return this.$store.state.cart
			},
			()=>{
				this.setCart()
				this.calculatePrice()
			}
		)
	},
	mounted(){
		this.stripe = Stripe(process.env.NUXT_ENV_STRIPE_KEY);
	},
	methods:{
		removeFromCart(e){
			let cart = this.cart
			let tempCart = [];
			for(let i = 0; i < cart.length; i++){
				if(cart[i].id != e){
					tempCart.push(cart[i])
				}
			}
			this.$store.commit('REPLACE_CART',tempCart)
		},
		calculatePrice(){
			const cart = this.cart
			this.total = 0
			let tempTotal = 0
			for(let i = 0; i < cart.length; i++){
				tempTotal = parseFloat(cart[i].price) * parseInt(cart[i].quantity)
				this.total += tempTotal
				tempTotal = 0
			}
		},
		setCart(){
			if(localStorage.getItem('cart'))
				this.cart = JSON.parse(localStorage.getItem('cart'))
		},
		async stripe_checkout() {
			let items =[]
			for(let i = 0; i <  this.cart.length; i++){
				items.push({
					price_data: {
						currency: 'usd',
						product_data: {
							name: this.cart[i].name,
							description: this.cart[i].description,
							metadata: {'order_id': '6735'}
						},
						unit_amount: this.cart[i].price * 100,
					},
					quantity: this.cart[i].quantity
				})
			}
		try {
			const { data } = await this.$axios.post("/api/checkout", {
				order: items
			});
			this.stripe.redirectToCheckout({ sessionId: data.id });
		} catch (err) {
			alert(err);
		}
	},
	}
}
</script>