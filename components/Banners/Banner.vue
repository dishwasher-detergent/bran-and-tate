<template>
	<div>
		{{data}}
		<div v-for="item in data" :key="item.id">
			<div v-if="item.type == 'normal'" class="mt-6 w-full bg-blue-100 text-gray-700 ring-1 ring-blue-300 rounded-xl py-2 px-4">
				<p>{{item.message}}</p>
			</div>
			<div v-else-if="item.type == 'important'" class="mt-6 w-full bg-red-100 text-gray-700 ring-1 ring-red-300 rounded-xl py-2 px-4">
				<p>{{item.message}}</p>
			</div>
			<div v-else-if="item.type == 'warning'" class="mt-6 w-full bg-yellow-100 text-gray-700 ring-1 ring-yellow-300 rounded-xl py-2 px-4">
				<p>{{item.message}}</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			data: null
		}
	},
	async fetch(){
		let { data, error } = await this.$supabase
        .from('banners')
        .select('message,type')
		.eq('active', true)
        if(error){
          console.error(error)
        } else {
          this.data = data
        }
	}
}
</script>