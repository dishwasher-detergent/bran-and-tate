<template>
	<div class="w-full h-96 rounded shadow ring-1 ring-gray-200 bg-white overflow-hidden">
		<div class="w-full h-2/5 bg-gray-200 flex items-center justify-center overflow-hidden">
			<img class="w-full" :src="require(`~/assets/${image}.jpg`)" />
		</div>
		<div class="h-3/5 grid grid-rows-4 ">
			<div class="h-full w-full p-2 px-4 overflow-y-hidden row-span-3">
				<h1 class="font-bold text-3xl truncate">
					{{title}}
				</h1>
				<h3 class="text-xl">
					${{price}}
				</h3>
				<p class="break-words text-lg">
					{{description}}
				</p>
			</div>
			<div class="w-full flex items-center justify-center">
				<transition name="fade">
					<button v-if="addedToCart" class="px-4 py-2 rounded bg-green-500 text-white text-sm">In Cart!</button>
					<button v-else class="px-4 py-2 rounded bg-babyBlue text-white text-sm" @click="showModal()">Quick View</button>
				</transition>
			</div>
		</div>
		<ModalMain
			v-show="isModalVisible"
			:colors="colors"
			:title="title"
			:price="price"
			:id="id"
			:image="image"

			@close="closeModal"
			>
			<template v-slot:img>
				<img :src="require(`~/assets/${image}.jpg`)" class="h-full"/>
			</template>
			<template v-slot:header>
				{{title}}
			</template>
			<template v-slot:price>
				{{price}}
			</template>
			<template v-slot:size>
				<p>Height: {{size.h}}'</p>
				<p>Width: {{size.w}}'</p>
			</template>
			<template v-slot:description>
				{{description}}
			</template>
		</ModalMain>
	</div>
</template>
<script>
export default {
	props: [
		'title',
		'description',
		'colors',
		'size',
		'price',
		'id',
		'image'
	],
	data() {
      return {
        isModalVisible: false,
		addedToCart: false,
      };
    },
	mounted(){
		window.addEventListener('keyup', this.closeModal)
		this.checkCart()
		this.$store.watch(
			(state)=>{
				return this.$store.state.cart
			},
			()=>{
				this.checkCart()
			}
		)
	},
    methods: {
      showModal() {
		document.querySelector('body').style.overflow = 'hidden';
        this.isModalVisible = true;
      },
      closeModal(e = '') {
		if(e){
			if(e.key != 'Escape') return;
		}
		document.querySelector('body').style.overflow = 'auto';
        this.isModalVisible = false;
      },
	  checkCart(){
		  const cart = this.$store.state.cart
		  for(let i = 0; i < cart.length; i++){
			  if(cart[i].id == this.id) this.addedToCart = true
		  }
	  }
    }
}
</script>
<style scoped>
	.fade-leave-active,
	.fade-enter-active {
		transition: .5s;
	}
	.fade-enter,.fade-leave-to {
		opacity:0
	}
</style>