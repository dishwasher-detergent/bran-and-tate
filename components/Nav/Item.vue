<template>
	<button class="flex items-center justify-center h-full w-2 px-16 text-lg rounded-t-xl">
		<p class="rounded-full py-2 px-4 hover:bg-blue-200">
			<slot></slot>
		</p>
	</button>
</template>
<style scoped>
p {
	transition: all .15s;
}
</style>