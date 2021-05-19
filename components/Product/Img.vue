<template>
	<div>
		<img class="w-full" :src="image">
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