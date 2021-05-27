<script>
  export default {
    name: 'Modal',
	props: [
		'colors',
		'title',
		'price',
		'id',
		'editing',
		'description'
	],
	data(){
		return{
			count: 1,
			secondary: false,
			color: "blue",
		}
	},
    methods: {
		close() {
			this.$emit('close');
		},
		incCnt(){
			this.count++
		},
		dcrsCnt(){
			if(this.count == 1) return;
			this.count--
		},
		afterEnter(){
			this.secondary = true
		},
		afterLeave(){
			this.secondary = false
		},
		add_to_cart() {
			const product = {
				name: this.title,
				color: this.color,
				price: this.price,
				quantity: this.count,
				id: this.id,
				description: this.description
			}
			this.$store.commit('UPDATE_CART',product)
			this.close()
		}
    },
  };
</script>

<template>
  <transition name="fade" v-on:after-enter="afterEnter" v-on:before-leave="afterLeave">
    <div class="top-0 bottom-0 left-0 right-0 fixed flex flex-col md:flex-row justify-end z-50 bg-gray-900 bg-opacity-10">
		<div @click='close' class="relative h-1/6 md:h-full w-full"></div>
		<transition name="slide">
			<div v-show="secondary" class="relative overflow-hidden h-5/6 md:h-full w-full md:w-96 flex-none flex flex-col rounded-t-2xl md:rounded-l-2xl md:rounded-t-none shadow-t bg-gray-50 border-t border-gray-300"
				role="dialog"
				aria-labelledby="Add To Cart"
				aria-describedby="Choose what color and how many you want then add to cart"
			>
				<section
				class="w-full h-full pb-20 flex flex-col text-md md:text-xl relative"
				>
				<div class="w-full h-96 flex-none bg-gray-200 flex items-center justify-center">
					<button aria-label="Close Modal" @click='close' class="h-6 w-6 absolute top-0 right-0 mt-2 mr-4 ring-1 ring-red-500 p-1 bg-red-200 text-red-500 rounded-full">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
						</svg>
					</button>
				<slot name="img"></slot>
				</div>
				<div class="absolute top-0 h-full flex flex-col w-full overflow-y-auto">
					<div class="w-full h-96 flex-none">

					</div>
					<div style="min-height: 36rem" class="w-full h-full p-5 space-y-2 md:space-y-5 relative -mt-10 bg-white rounded-2xl flex-1">
						<div class="md:hidden w-full flex items-center justify-center text-gray-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
							</svg>
						</div>
						<h1 class="font-bold text-4xl md:text-5xl">
							<slot name="header"></slot>
						</h1>
						<h3 class="text-2xl md:text-3xl">
							$<slot name="price"></slot>
						</h3>
						<div v-if="colors.length > 0">
							<h4 class="mb-2 font-bold text-xl md:text-2xl">Colors</h4>
							<div class="inline-block">
								<ProductColor
									:colors="colors"
								/>
							</div>
						</div>
						<div>
							<h4 class="font-bold text-xl md:text-2xl">Description</h4>
							<p class="break-words">
								<slot name="description"></slot>
							</p>
						</div>
						<div class="pb-10">
							<h4 class="font-bold text-xl md:text-2xl">Dimensions</h4>
							<p>
								<slot name="size"></slot>
							</p>
						</div>
					</div>
				</div>
				</section>
				<footer class="w-full h-20 absolute bottom-0 flex">
				<button
					type="button"
					class="w-3/5 h-full bg-blue-500 text-white font-bold"
					@click="add_to_cart"
					aria-label="Add To Cart"
					:disabled="!!editing"
				>
					Add to Cart
				</button>
				<div class="h-full w-2/5 bg-gray-50 flex flex-row">
					<div class="w-1/2 ring-1 ring-gray-300 flex items-center justify-center">
						<h2 class="text-4xl font-bold">{{count}}</h2>
					</div>
					<div class="flex flex-col w-1/2 ring-1 ring-gray-300">
						<button aria-label="Increase Quantity" class="w-full h-1/2 bg-gray-200 flex items-center justify-center" @click="incCnt()">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
							</svg>
						</button>
						<button aria-label="Decrease Quantity" class="w-full h-1/2 bg-gray-200 flex items-center justify-center" @click="dcrsCnt()">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
							</svg>
						</button>
					</div>
				</div>
				</footer>
			</div>
		</transition>
    </div>
  </transition>
</template>
<style scoped>
	.shadow-t {
		box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06);
	}

	.slide-leave-active,
	.slide-enter-active {
		transition: .15s;
	}
	.slide-enter {
		transform: translate(100%,0);
	}
	.slide-leave-to {
		transform: translate(100%,0);
	}

	.fade-leave-active,
	.fade-enter-active {
		transition: .15s;
	}
	.fade-enter,.fade-leave-to {
		opacity:0
	}
</style>