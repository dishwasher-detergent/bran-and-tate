<template>
	<div class="flex items-center p-2 space-x-4 bg-gray-100 ring-1 ring-gray-300 rounded">
		<div v-for="color in colors" :key="color.id" class="w-5 h-5 md:w-6 md:h-6 rounded-full ring-1 ring-gray-300 overflow-hidden">
			<input v-model="checked_color" name="product-color" :id="color + id" type="radio" class="hidden" :value="color"/>
			<label :for="color + id" class="block w-full h-full cursor-pointer" :style="'background-color:'+color" :title="color">
				<svg v-if="checked_color == color" xmlns="http://www.w3.org/2000/svg" class="h-full w-full p-1 bg-white bg-opacity-50" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
				</svg>
			</label>
		</div>
	</div>
</template>
<script>
export default {
	props: [
		'colors',
	],
	data(){
		return{
			id: Math.floor(100000 + Math.random() * 900000),
			checked_color: ''
		}
	}
}
</script>
<style scoped>
	/* input[type="radio"]:checked + label {
		@apply bg-gray-900;
	} */
</style>