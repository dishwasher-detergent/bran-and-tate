<template>
    <div class="space-y-6 md:space-y-0 space-x-0 md:space-x-6 flex flex-col md:flex-row w-full">
        <WidgetContainer>
            <form @submit.stop.prevent="createBanner" class="space-y-6">
                <h1 class="font-bold text-3xl pb-8">Banners</h1>
                <label for="message" class="pb-4 block">
                    <p class="pb-4">Message</p>
                    <input v-model="message" type='text' id="message" class="input input-bordered w-full" required/>
                </label>
				<div>
                    <p class="text-lg">Type</p>
                    <div class="form-control bg-gray-50 rounded-2xl ring-1 ring-border p-2">
                        <label class="cursor-pointer label" v-for="type in type_list" :key="type.id">
                            <span class="label-text">{{type}}</span> 
                            <div>
                                <input v-model="types" type="radio" name="type" checked="checked" class="radio radio-primary" :value="type"> 
                                <span class="radio-mark"></span>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="w-full flex items-center justify-center">
                    <button aria-label="Create Banner" class="btn btn-primary">
                        Create Banner
                    </button>
                </div>
            </form>
        </WidgetContainer>
        <WidgetContainer>
            <h1 class="font-bold text-3xl pb-8">Active Banners</h1>
			<BannersBanner
				editing="true"
			/>
		</WidgetContainer>
    </div>
</template>
<script>
export default {
  data() {
    return {
        message: '',
        types: '',
		type_list: null
    }
  },
  created(){
	  this.getTypes()
  },
  methods: {
    async createBanner(){
        const { data, error } = await this.$supabase
		.from('banners')
		.insert([
			{ 
				message: this.message, 
				type: this.types.toLowerCase() 
			}
		])
    },
	async getTypes(){
		try {
			const { data, error } = await this.$supabase
			.from('types')
			.select('types')
			.eq('title','banners')

			if (error) {
				throw error
			}
			this.type_list = data[0].types
		} catch (error) {
			console.log('Error Getting Types: ', error.message)
		}
	}
  }
}
</script>
<style scoped>
input[type="text"],input[type="tel"],textarea{
    @apply border;
    @apply border-base-300;
    @apply p-2;
    @apply rounded-2xl;
    @apply w-full
}

p {
    @apply pb-2;
    @apply pl-2
}
</style>