<script>
  export default {
    name: 'Modal',
	props: [
		'colors',
		'title',
		'price',
		'id',
		'image'
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
				image: this.image
			}
			this.$store.commit('UPDATE_CART',product)
			this.close()
		}
    },
  };
</script>

<template>
  <transition name="slide" v-on:after-enter="afterEnter" v-on:before-leave="afterLeave">
    <div class="top-0 bottom-0 left-0 right-0 fixed flex flex-row justify-end z-50">
		<transition name="fade">
	  		<div class="relative h-full w-full bg-gray-900 bg-opacity-10" v-show="secondary" @click="close"></div>
		</transition>
      <div class="relative overflow-hidden h-full w-full md:w-96 flex-none flex flex-col rounded-l-xl shadow-t bg-gray-50 border-t border-gray-300"
        role="dialog"
        aria-labelledby="Add To Cart"
        aria-describedby="Choose what color and how many you want then add to cart"
      >
        <section
          class="w-full h-full pb-20 flex flex-col text-md md:text-xl"
        >
		<div class="w-full h-96 flex-none bg-gray-200 flex items-center justify-center">
          <slot name="img"></slot>
		</div>
		<div class="w-full h-full p-5 space-y-2 md:space-y-5 overflow-y-scroll relative -mt-10 bg-white rounded-xl">
			<h1 class="font-bold text-4xl md:text-5xl">
				<slot name="header"></slot>
			</h1>
			<h3 class="text-2xl md:text-3xl">
				$<slot name="price"></slot>
			</h3>
			<div v-if="colors.length > 0">
				<h4 class="mb-2 font-bold text-xl md:text-2xl">Colors</h4>
				<div class="inline-block">
					<ProductColorContainer>
						<ProductColor v-for="color in colors" :key="color.id" 
							:color="color"
						/>
					</ProductColorContainer>
				</div>
			</div>
			<div>
				<h4 class="mb-2 font-bold text-xl md:text-2xl">Quantity</h4>
				<div class="w-24 h-8 md:w-40 md:h-10 bg-gray-100 ring-1 ring-gray-200 rounded flex flex-row">
					<button class="w-3/5 h-full bg-gray-200" @click="dcrsCnt()">-</button>
					<p class="w-full flex items-center justify-center bold md:text-xl">{{count}}</p>
					<button class="w-3/5 h-full bg-gray-200" @click="incCnt()">+</button>
				</div>
			</div>
			<div>
				<h4 class="font-bold text-xl md:text-2xl">Description</h4>
				<p class="break-words">
					<slot name="description"></slot>
				</p>
			</div>
			<div class="pb-10">
				<h4 class="font-bold text-xl md:text-2xl">Demensions</h4>
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