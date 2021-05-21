<template>
	<div>
		<div v-for="item in data" :key="item.id">
			<div v-if="item.type == 'normal'" class="mt-6 w-full bg-blue-100 text-gray-700 ring-1 ring-blue-300 rounded-xl py-2 px-4 flex flex-row">
				<p class="w-full">{{item.message}}</p>
				<button v-if="editing" @click="deleteBanner(item.id)">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
				</button>
			</div>
			<div v-else-if="item.type == 'urgent'" class="mt-6 w-full bg-red-100 text-gray-700 ring-1 ring-red-300 rounded-xl py-2 px-4 flex flex-row">
				<p class="w-full">{{item.message}}</p>
				<button v-if="editing" @click="deleteBanner(item.id)">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
				</button>
			</div>
			<div v-else-if="item.type == 'important'" class="mt-6 w-full bg-yellow-100 text-gray-700 ring-1 ring-yellow-300 rounded-xl py-2 px-4 flex flex-row">
				<p class="w-full">{{item.message}}</p>
				<button v-if="editing" @click="deleteBanner(item.id)">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: [
		'editing',
	],
	data(){
		return{
			data: null
		}
	},
	created(){
		this.$supabase
		.from('banners')
		.on('DELETE', payload => {
			this.getBanners()
		})
		.on('INSERT', payload => {
			this.getBanners()
		})
		.on('UPDATE', payload => {
			this.getBanners()
		})
		.subscribe()
	},
	mounted(){
		this.getBanners()
	},
	methods: {
		async getBanners(){
			let { data, error } = await this.$supabase
			.from('banners')
			.select('message,type,id')
			.eq('active', true)
			if(error){
				console.error(error)
			} else {
				this.data = data
			}
		},
		async deleteBanner(id){
			try {
				const { data, error } = await this.$supabase
				.from('banners')
				.delete()
				.match({ id: id })

				if (error) {
					throw error
				}
			} catch (error) {
				console.log('Error Deleting Banner: ', error.message)
			}
		}
	}
}
</script>