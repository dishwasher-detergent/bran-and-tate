<template>
	<nuxt-link v-if="type == 'cart'" :to="'cart'" class="flex items-center justify-center h-full md:px-16 text-lg">
		<p class="rounded-xl py-2 px-4 relative">
			<slot></slot>
		</p>
	</nuxt-link>
	<button @click="toggleModal()" v-else-if="type == 'drop'" class="relative flex items-center justify-center h-full md:px-16 text-lg">
		<p class="rounded-xl py-2 px-4 hover:bg-babyBlue">
			<slot name="icon"></slot>
		</p>
		<NavDrop
			v-show="isModalVisible"
			@close="closeModal"
		>
			<slot name="content"></slot>
		</NavDrop>
	</button>
	<div v-else class="flex items-center justify-center py-2 w-full text-center text-lg">
		<input @input="search" :id="value" :value="value" type="checkbox" class="hidden"/>
		<label :for="value" class="cursor-pointer rounded-xl py-2 px-4 hover:bg-babyBlue relative">
			<slot></slot>	
		</label>
	</div>
</template>
<script>
export default {
	props:[
		'type',
		'value'
	],
	data(){
		return{
			isModalVisible: false
		}
	},
	methods: {
		search(e) {
			this.$emit('sort',e)
		},
		toggleModal(){
			if(this.isModalVisible) this.closeModal()
			else this.showModal()
		},
		showModal() {
			this.isModalVisible = true;
		},
		closeModal() {
			this.isModalVisible = false;
		},
	}
}
</script>
<style scoped>
p {
	transition: all .15s;
}

input[type="checkbox"]:checked + label {
	@apply bg-blue-200
}
</style>