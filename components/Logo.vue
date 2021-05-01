<template>
	<div class="flex items-center justify-center w-full h-24 mb-5 bg-gray-100 border-b-2 border-gray-200">
		<img v-if="image && alt" :src="image" :alt="alt" />
		<div v-else class="flex items-center justify-center w-16 h-16 rounded-full ring-2 ring-blue-600 bg-babyBlue text-white font-bold">
			Logo
		</div>
	</div>
</template>
<script>
export default {
	props: [
		'image',
		'alt'
	]
}
</script>