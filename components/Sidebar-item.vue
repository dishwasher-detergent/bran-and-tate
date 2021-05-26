<template>
	<li>
		<a :aria-label="'Go to' + stage" @click="setDashboard()" :class="(layout == stage ? 'bg-blue-500' : '')">
			<slot></slot>
		</a>
	</li>
</template>
<script>
export default {
	props: [
		'stage'
	],
	data(){
		return{
			layout: 'add_or_edit'
		}
	},
	watch: {
		'$store.state.dashboard': function() {
			this.layout = this.$store.state.dashboard
		},
	},
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