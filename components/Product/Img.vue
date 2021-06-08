<template>
	<div :class="'w-full relative h-' + (height / 16) * 4"> 
		<ik-image
			:path="id"
			:lqip="{active:true}"
			:transformation="[{q:75,c:'fo-auto',height:height,width:width}]"
			class="w-full h-full"
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
		width: {
			type: String,
			default: "288"
		},
		height: {
			type: String,
			default: "400"
		}
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