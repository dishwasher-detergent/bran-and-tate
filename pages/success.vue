<template>
<div>
	<div class="mx-auto max-w-7xl px-5 h-full pt-10">
		<!-- <h1 v-if="id" class="font-bold text-4xl md:text-6xl text-center">Thank you for shopping with us! We will email you as soon as we ship your product(s).</h1>
		<div v-else>
			<h1 class="font-bold text-4xl md:text-6xl text-center">It seems there was an issue with the checkout process.</h1>
			<p>If you have any questions please email support@branandtate.com</p>
		</div> -->
		{{id}}
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
			this.id = data
	},
	}
}
</script>