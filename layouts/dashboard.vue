<template>
  <div class="h-screen" data-theme="main">
    <Sidebar>
      <Nuxt />
    </Sidebar>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
}
</script>
<style scoped>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
}
</style>
