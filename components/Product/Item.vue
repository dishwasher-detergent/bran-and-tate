<template>
	<div class="w-80 xl:w-72 rounded-2xl ring-1 ring-gray-300 bg-white overflow-hidden shadow">
		<div class="w-full h-72 bg-gray-200 flex items-center justify-center overflow-hidden relative z-10">
			<ProductImg v-if="image" :id="image"/>
			<button aria-label="Delete Product" v-if="this.$auth.loggedIn" @click='deleteProduct(id)' class="h-6 w-6 absolute top-0 right-0 mt-2 mr-2 ring-1 ring-red-500 p-1 bg-red-200 text-red-500 rounded-full">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
				</svg>
			</button>
		</div>
		<div class="h-72 rounded-2xl -mt-10 py-5 flex flex-col relative bg-white z-20 ring-1 ring-gray-300">
			<div class="h-full w-full px-4 overflow-y-hidden flex-1 mb-4">
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
			<div class="w-full flex items-center justify-center px-4 flex-none">
				<transition name="fade">
					<button aria-label="Disabled" disabled="disabled" v-if="addedToCart" class="btn w-full btn-primary">In Cart!</button>
					<button aria-label="Quick View" v-else class="btn w-full btn-primary" @click="showModal()">Quick View</button>
				</transition>
			</div>
		</div>
		<ModalMain
			v-show="isModalVisible"
			:colors="colors"
			:title="title"
			:price="price"
			:id="id"
			:description="description"
			:editing="editing"
			:image="image"

			@close="closeModal"
			>
			<template v-slot:img>
				<ProductImg v-if="image" :id="image" width="sm:100vw md:50vw lg:400px" height="384"/>
			</template>
			<template v-slot:header>
				{{title}}
			</template>
			<template v-slot:price>
				{{price}}
			</template>
			<template v-slot:size>
				<p>Height: {{size.h}}</p>
				<p>Width: {{size.w}}</p>
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
		'image',
		'editing',
	],
	data() {
      return {
        isModalVisible: false,
		addedToCart: false,
      }
    },
	created(){
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
		  if(cart.length != 0){
			for(let i = 0; i < cart.length; i++){
				if(cart[i].id == this.id) this.addedToCart = true
			}
		  } else {
			  this.addedToCart = false
		  }
	  },
	  async deleteProduct(){
		try {
			const { data, error } = await this.$supabase
			.from('products')
			.delete()
			.match({ id: this.id })
			if (error) {
				throw error
			}
		} catch (error) {
			console.log('Error Deleting: ', error.message)
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