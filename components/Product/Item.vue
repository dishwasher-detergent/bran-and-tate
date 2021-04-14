<template>
	<div class="w-full h-96 rounded shadow ring-2 ring-gray-200 bg-white">
		<div class="w-full h-1/2 bg-gray-200">

		</div>
		<div class="h-1/2 flex flex-col">
			<div class="h-full w-full p-2 overflow-y-hidden">
				<h1 class="font-bold text-2xl">
					{{title}}
				</h1>
				<p class="break-words">
					{{description}}
				</p>
			</div>
			<div class="w-full h-20 flex items-center justify-center">
				<button class="px-4 py-2 rounded bg-blue-500 text-white text-sm" @click="showModal()">Add to Cart</button>
			</div>
		</div>
		<ModalMain
			v-show="isModalVisible"
			:colors="colors"
			@close="closeModal"
			>
			<template v-slot:header>
				{{title}}
			</template>
			<template v-slot:img>
			</template>
			<template v-slot:size>
				{{size}}
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