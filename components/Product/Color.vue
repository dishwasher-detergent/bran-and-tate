<template>
	<div class="w-10 h-10 rounded-full ring-1 ring-gray-200 overflow-hidden">
		<input name="product-color" id="temp3" type="radio" class="hidden" />
		<label for="temp3" class="block w-full h-full bg-red-200 cursor-pointer" :title="color"></label>
	</div>
</template>
<script>
export default {
	props: [
		'color',
	],
}
</script>
<style scoped>
	input[type="radio"]:checked + label {
		@apply bg-gray-900;
	}
</style>