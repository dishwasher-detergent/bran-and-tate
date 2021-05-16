<template>
	<div class="w-full rounded-xl shadow ring-1 ring-gray-200 bg-white overflow-hidden">
		<div class="w-full h-72 bg-gray-200 flex items-center justify-center overflow-hidden relative z-10">
			<img class="w-full" :src="(image_editing ? image_editing : image)" />
		</div>
		<div class="h-60 rounded-xl -mt-10 py-5 grid grid-rows-4 relative bg-white z-20">
			<div class="h-full w-full px-4 overflow-y-hidden row-span-3">
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
					<button v-else class="px-4 py-2 rounded bg-blue-500 text-white text-sm" @click="showModal()">Quick View</button>
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
				<img class="w-full" :src="image" />
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
		'id'
	],
	data() {
      return {
        isModalVisible: false,
		addedToCart: false,
		image: ''
      }
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
	async fetch(){
		try {
			const { data, error } = await this.$store.state.client
			.storage
			.from('product-images')
			.download(this.id + '.png')
		if (error) {
			throw error
		}
			const url = URL.createObjectURL(data)
			this.image = url
		} catch (error) {
			console.log('Error downloading image: ', error.message)
		}
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