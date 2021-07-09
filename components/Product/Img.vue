<template>
  <div class="w-full h-full relative">
    <ik-image
      :path="id"
      :lqip="{ active: true }"
      :transformation="[{ q: 75, c: 'fo-auto' }]"
      class="w-full h-full object-cover object-left-top"
      :alt="alt"
    />
  </div>
</template>
<script>
export default {
	props: {
		id: {
			type: String,
			default: ""
		},
		alt: {
			type: String,
			default: ""
		},
	}
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
