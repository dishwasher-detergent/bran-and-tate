<template>
	<li>
		<nuxt-link :to="stage" :aria-label="'Go to' + stage" :class="(slug == stage ? 'bg-blue-500 text-white' : '')">
			<slot></slot>
		</nuxt-link>
	</li>
</template>
<script>
export default {
	props: [
		'stage'
	],
	data(){
		return{
			slug: ''
		}
	},
	mounted() {
        this.slug = this.$route.params.slug
    },
	watch: {
  	'$route': function(newVal, oldVal) {
    	this.slug = this.$route.params.slug
    }
  },
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