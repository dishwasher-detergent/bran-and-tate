<template>
	<div>
		<div v-for="item in data" :key="item.id" class="mt-4 max-w-7xl mx-auto">
			<div :class="'alert alert-' + item.type">
				<div class="flex-1 flex w-full">
					<div data-tip="Delete" class="tooltip" v-if="editing">
						<button class="flex-none" aria-label="Delete Banner" @click="deleteBanner(item.id)">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
							</svg>
						</button>
					</div>
					<svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 flex-none stroke-current">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!---->
					</svg> 
					<label class="w-11/12 break-words">
						{{item.message}}
					</label>
				</div>
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