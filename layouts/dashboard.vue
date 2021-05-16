<template>
  <div class="h-screen bg-white text-gray-700 relative flex flex-row">
    <Sidebar />
    <Dashboard />
  </div>
</template>
<script>
  export default {
    middleware: 'auth'
  }
</script>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    @apply text-gray-900;
}
</style>
