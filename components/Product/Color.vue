<template>
	<div class="w-5 h-5 md:w-10 md:h-10 rounded-full ring-1 ring-gray-200 overflow-hidden">
		<input name="product-color" :id="color + id" type="radio" class="hidden" />
		<label :for="color + id" class="block w-full h-full bg-red-200 cursor-pointer" :title="color"></label>
	</div>
</template>
<script>
export default {
	props: [
		'color',
	],
	data(){
		return{
			id: Math.floor(100000 + Math.random() * 900000)
		}
	}
}
</script>
<style scoped>
	input[type="radio"]:checked + label {
		@apply bg-gray-900;
	}
</style>