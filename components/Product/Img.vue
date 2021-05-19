<template>
	<div>
		<img v-if="!image" class="w-full" src="~/static/placeHolder.png"> 
		<transition name="fade">
			<img v-if="image" class="w-full" :src="image">
		</transition>
	</div>
</template>
<script>
export default {
	props: [
		'id',
	],
	data(){
		return{
			image: null
		}
	},
	async fetch(){
		try {
			const { data, error } = await this.$supabase
			.storage
			.from('product-images')
			.download(this.id + '.png')
		if (error) {
			throw error
		}
			const url = URL.createObjectURL(data)
			this.image = url
		} catch (error) {
			console.log('Error downloading image: ', error.message)
		}
	},
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