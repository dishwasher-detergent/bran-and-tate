<script>
  export default {
    middleware({ store, redirect }) {
        return redirect('/Dashboard/Orders')
    }
  }
</script>