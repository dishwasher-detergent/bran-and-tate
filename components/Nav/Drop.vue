<script>
  export default {
    name: 'Drop',
    methods: {
		close() {
			this.$emit('close');
		},
    },
  };
</script>

<template>
    <transition name="fade">
        <div class="absolute w-48 md:w-96 h-80 p-2 top-20 md:top-24 right-5 md:right-0 bottom-0 rounded-2xl shadow-md bg-base-100 border border-gray-200"
            role="location"
            aria-labelledby="Locations"
            aria-describedby="List of brick and mortar locations"
        >
            <slot></slot>
        </div>
    </transition>
</template>
<style scoped>
	.fade-leave-active,
	.fade-enter-active {
		transition: .15s;
	}
	.fade-enter,.fade-leave-to {
		opacity:0
	}
</style>