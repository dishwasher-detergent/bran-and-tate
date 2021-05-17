<template>
	<div v-if="message" class="mt-6 w-full bg-blue-100 text-gray-700 ring-1 ring-blue-300 rounded-xl py-2 px-4">
		<p>{{message}}</p>
	</div>
</template>
<script>
export default {
	data(){
		return{
			message: null
		}
	},
	async fetch(){
		let { data, error } = await this.$supabase
        .from('banners')
        .select('message')
		.eq('active', true)
        if(error){
          console.error(error)
        } else {
          this.message = data[0].message
        }
	}
}
</script>