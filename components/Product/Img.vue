<template>
	<div :class="'w-full relative h-' + (height / 16) * 4"> 
		<nuxt-img
			provider="imagekit"
			:src="id"
			quality="80"
			:height="height"
			class="w-full"
		/>
	</div>
</template>
<script>
export default {
	props: [
		'id',
		'width',
		'height',
	],
	data(){
		return{
			width: "xl:320px 2xl:288px",
			height: "288"
		}
	}
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