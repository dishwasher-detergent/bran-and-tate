<template>
	<div class="p-3 h-16 md:h-full w-full flex items-center justify-center">
		<div class="w-full h-full relative">
		<input v-model="search" type='text' class="h-full w-full rounded-xl bg-gray-50 border-gray-300 border pl-5 pr-10 truncate focus:bg-white focus:ring-blue-500" />
		<div class="absolute right-0 top-0 px-2 h-full flex items-center justify-center text-gray-500">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
			</svg>
		</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return{
			search: ''
		}
	},
	watch: {
    search: function (value) {
      this.$emit('sort',value)
    }
  }
}
</script>