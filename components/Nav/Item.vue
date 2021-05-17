<template>
	<nuxt-link :to="link" v-if="type == 'link'" class="flex items-center justify-center h-full w-2 px-16 text-lg">
		<p class="rounded-full py-2 px-4 hover:bg-babyBlue">
			<slot></slot>
		</p>
	</nuxt-link>
	<button @click="toggleModal()" v-else-if="type == 'drop'" class="relative flex items-center justify-center h-full w-2 px-16 text-lg">
		<p class="rounded-full py-2 px-4 hover:bg-babyBlue">
			<slot></slot>
		</p>
		<NavDrop
			v-show="isModalVisible"
			@close="closeModal"
			>
				<h1 class="bg-gray-100 rounded font-bold">MainStreet MarketPlace</h1>
				<p class="mt-2 text-sm w-full text-center"><b>Address</b></p>
				<p class="text-left text-sm">429 W Main St, Yukon, OK 73099</p>
				<p class="mt-2 text-sm w-full text-center"><b>Time</b></p>
				<div class="text-left text-sm flex flex-col">
					<div class="flex justify-between"><p>Friday</p><p>10AM–5:30PM</p></div>
					<div class="flex justify-between"><p>Saturday</p><p>10AM–4PM</p></div>
					<div class="flex justify-between"><p>Sunday</p><p>Closed</p></div>
					<div class="flex justify-between"><p>Monday</p><p>10AM–5:30PM</p></div>
					<div class="flex justify-between"><p>Tuesday</p><p>10AM–5:30PM</p></div>
					<div class="flex justify-between"><p>Wednesday</p><p>10AM–5:30PM</p></div>
					<div class="flex justify-between"><p>Thursday</p><p>10AM–5:30PM</p></div>
				</div>
		</NavDrop>
	</button>
	<button v-else class="flex items-center justify-center h-full w-2 px-16 text-lg">
		<p class="rounded-full py-2 px-4 hover:bg-babyBlue">
			<slot></slot>
		</p>
	</button>
</template>
<script>
export default {
	props: [
		'type',
		'link'
	],
	data(){
		return{
			isModalVisible: false
		}
	},
	methods: {
		toggleModal(){
			if(this.isModalVisible) this.closeModal()
			else this.showModal()
		},
		showModal() {
			this.isModalVisible = true;
		},
		closeModal() {
			this.isModalVisible = false;
		},
	}
}
</script>
<style scoped>
p {
	transition: all .15s;
}
</style>