<template>
	<li>
		<a :aria-label="'Go to' + stage" @click="setDashboard()" :class="(layout == stage ? 'bg-blue-500 text-white' : '')">
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
			layout: 'orders'
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
	.text-white {
		color: white !important
	}
</style>