<template>
<div>
	<div class="mx-auto max-w-7xl px-5 h-full pt-10">
		<h1>{{id}}</h1>
	</div>
</div>
</template>
<script>
export default {
	data(){
		return{
			id: null
		}
	},
	async mounted(){
		await this.retrieve_lineitems()
	},
	methods:{
		async retrieve_lineitems() {
			const { session_id = null } = this.$route.query;
			const { data } = await this.$axios.post("/api/success", {
				id: session_id
			});
			this.items = data
	},
	}
}
</script>