<template>
	<nuxt-link v-if="type == 'cart'" :to="'cart'" class="flex items-center justify-center h-full w-2 px-16 text-lg rounded-t-xl">
		<p class="rounded-full py-2 px-4 hover:bg-blue-200 relative">
			<slot></slot>
		</p>
	</nuxt-link>
	<button v-else @click="search" class="flex items-center justify-center h-full w-2 px-16 text-lg rounded-t-xl">
		<p class="rounded-full py-2 px-4 hover:bg-blue-200 relative">
			<slot></slot>
		</p>
	</button>
</template>
<script>
export default {
	props:[
		'type'
	],
	methods: {
		search() {
			console.log(this.type)
			this.$emit('sort',this.type)
		}
	}
}
</script>
<style scoped>
p {
	transition: all .15s;
}
</style>