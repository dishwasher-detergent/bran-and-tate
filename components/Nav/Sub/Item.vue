<template>
	<nuxt-link v-if="type == 'cart'" :to="'cart'" class="flex items-center justify-center h-full w-2 px-16 text-lg">
		<p class="rounded-full py-2 px-4 relative">
			<slot></slot>
		</p>
	</nuxt-link>
	<div v-else class="flex items-center justify-center h-full w-2 px-16 text-lg">
		<input @input="search" :id="value" :value="value" type="checkbox" class="hidden"/>
		<label :for="value" class="cursor-pointer rounded-full py-2 px-4 hover:bg-babyBlue relative">
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
	methods: {
		search(e) {
			this.$emit('sort',e)
		}
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