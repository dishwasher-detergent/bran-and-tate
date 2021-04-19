<template>
	<button v-if="type == 'link'" class="flex items-center justify-center h-full w-2 px-16 text-lg rounded-t-xl">
		<p class="rounded-full py-2 px-4 hover:bg-blue-200">
			<nuxt-link :to="link">
				<slot></slot>
			</nuxt-link>
		</p>
	</button>
	<button v-else class="flex items-center justify-center h-full w-2 px-16 text-lg rounded-t-xl">
		<p class="rounded-full py-2 px-4 hover:bg-blue-200">
			<slot></slot>
		</p>
	</button>
</template>
<script>
export default {
	props: [
		'type',
		'link'
	]
}
</script>
<style scoped>
p {
	transition: all .15s;
}
</style>