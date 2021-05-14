<template>
  <div>
    <Nuxt />
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
