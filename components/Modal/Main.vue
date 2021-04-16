<script>
  export default {
    name: 'Modal',
	props: [
		'colors',
		'title',
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
			}
			this.$store.commit('UPDATE_CART',this.test)
			this.close()
		}
    },
  };
</script>

<template>
  <transition name="slide" v-on:after-enter="afterEnter" v-on:before-leave="afterLeave">
    <div class="top-0 bottom-0 left-0 right-0 fixed flex flex-col justify-end z-50">
		<transition name="fade">
	  		<div class="relative w-full md:h-2/5 h-1/5 bg-gray-900 bg-opacity-10" v-show="secondary" @click="close"></div>
		</transition>
      <div class="relative overflow-hidden w-full md:h-3/5 h-4/5 flex flex-col rounded shadow-t bg-gray-50 border-t border-gray-300"
        role="dialog"
        aria-labelledby="Add To Cart"
        aria-describedby="Choose what color and how many you want then add to cart"
      >
        <section
          class="w-full h-full pb-20 flex flex-col md:flex-row text-md md:text-xl"
        >
		<div class="w-full h-1/2 md:w-1/2 md:h-full bg-gray-300">
          <slot name="img"></slot>
		</div>
		<div class="w-full md:w-3/5 md:h-full h-1/2 p-5 space-y-5 overflow-y-scroll relative">
			<button
			type="button"
			class="h-6 w-6 mt-5 mr-5 flex items-center justify-center absolute top-0 right-0"
			@click="close"
			aria-label="Close modal"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</button>
			<h1 class="font-bold text-3xl md:text-5xl">
				<slot name="header"></slot>
			</h1>
			<h3 class="font-bold text-xl md:text-2xl">Colors</h3>
			<div class="inline-block">
				<ProductColorContainer>
					<ProductColor v-for="color in colors" :key="color.id" 
						:color="color"
					/>
				</ProductColorContainer>
			</div>
			<h3 class="font-bold text-xl md:text-2xl">Quantity</h3>
			<div class="w-24 h-8 md:w-40 md:h-10 bg-gray-100 ring-1 ring-gray-200 rounded flex flex-row">
				<button class="w-3/5 h-full bg-gray-200" @click="dcrsCnt()">-</button>
				<p class="w-full flex items-center justify-center bold md:text-xl">{{count}}</p>
				<button class="w-3/5 h-full bg-gray-200" @click="incCnt()">+</button>
			</div>
			<div>
				<h3 class="font-bold text-xl md:text-2xl">Description</h3>
				<p class="break-words">
					<slot name="description"></slot>
				</p>
			</div>
			<div>
				<h3 class="font-bold text-xl md:text-2xl">Demensions</h3>
				<p>
					<slot name="size"></slot>
				</p>
			</div>
		</div>
        </section>

        <footer class="w-full h-20 absolute bottom-0">
          <button
            type="button"
            class="w-full h-full bg-blue-500 text-white font-bold"
            @click="add_to_cart"
            aria-label="Add To Cart"
          >
            Add to Cart
          </button>
        </footer>
      </div>
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
		transform: translate(0,100%);
	}
	.slide-leave-to {
		transform: translate(0,100%);
	}

	.fade-leave-active,
	.fade-enter-active {
		transition: .15s;
	}
	.fade-enter,.fade-leave-to {
		opacity:0
	}
</style>