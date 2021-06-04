<template>
	<div class="w-full h-72 relative"> 
		<nuxt-img
			provider="imagekit"
			:src="id"
			quality="80"
			sizes="xl:320px 2xl:288px"
			height="288"
		/>
	</div>
</template>
<script>
export default {
	props: [
		'id',
	]
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>