<template>
	<div class="w-full h-96 rounded shadow ring-1 ring-gray-200 bg-white">
		<div class="w-full h-2/5 bg-gray-200 flex items-center justify-center">
			Image Here
		</div>
		<div class="h-3/5 grid grid-rows-4 ">
			<div class="h-full w-full p-2 overflow-y-hidden row-span-3">
				<h1 class="font-bold text-3xl truncate">
					{{title}}
				</h1>
				<h3>
					${{price}}
				</h3>
				<p class="break-words">
					{{description}}
				</p>
			</div>
			<div class="w-full flex items-center justify-center">
				<button class="px-4 py-2 rounded bg-blue-500 text-white text-sm" @click="showModal()">Add to Cart</button>
			</div>
		</div>
		<ModalMain
			v-show="isModalVisible"
			:colors="colors"
			:title="title"
			:price="price"
			:id="id"

			@close="closeModal"
			>
			<template v-slot:img>
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
      };
    },
	mounted(){
		window.addEventListener('keyup', this.closeModal)
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
      }
    }
}
</script>