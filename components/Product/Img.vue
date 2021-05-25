<template>
	<div>
		<div class="w-full h-full" id="image-background"> 
			<client-only>
				<ik-image 
					v-if="image" 
					src="~/static/B&TLogo.png" 
				/>
			</client-only>
		</div>
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
#image-background {
	background-image: url('~/static/placeHolder.png');
	background-position: center;
	background-size: cover;
}
</style>