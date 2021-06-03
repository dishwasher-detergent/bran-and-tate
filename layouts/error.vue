<template>
   <section class="flex items-center h-full p-16 dark:bg-coolGray-900 dark:text-coolGray-100">
		<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
			<div class="max-w-md text-center">
				<h2 class="mb-8 font-extrabold text-9xl dark:text-coolGray-600">
					<span class="sr-only">Error </span>{{error.statusCode}} 
				</h2>
				<p class="text-2xl font-semibold md:text-3xl dark:text-coolGray-400">{{error.message}}</p>
				<p class="mt-4 mb-8">But dont worry, you can find plenty of other things at our store.</p>
				<nuxt-link to="/" class="btn btn-primary">Back to store</nuxt-link>
			</div>
		</div>
	</section>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>