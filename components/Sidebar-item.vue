<template>
	<button :aria-label="'Go to' + stage" @click="setDashboard()" class="block w-full pl-8 pr-4 py-.5 text-lg truncate text-left border-l-4 border-transparent hover:bg-blue-100 hover:border-blue-300">
		<slot></slot>
	</button>
</template>
<script>
export default {
	props: [
		'stage'
	],
	methods: {
		setDashboard() {
			this.$store.commit('SET_DASHBOARD',this.stage)
		}
	}
}
</script>
<style scoped>
	a {
		transition: all .15s;
	}
	a:hover {
		padding-left: 1.24rem;
	}
</style>