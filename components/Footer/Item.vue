<template>
	<button aria-label="Link" v-if="type == 'link'" class="flex items-center justify-center h-full w-2 px-16 text-lg">
		<p class="rounded-xl py-2 px-4 hover:bg-babyBlue">
			<nuxt-link :to="link">
				<slot></slot>
			</nuxt-link>
		</p>
	</button>
</template>
<script>
export default {
	props: [
		'type',
		'link'
	],
}
</script>
<style scoped>
p {
    @apply text-white;
	transition: all .15s;
}
</style>