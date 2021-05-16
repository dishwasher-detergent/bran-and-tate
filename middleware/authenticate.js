export default function ({ store, redirect }) {
    if(this.$auth.strategy.token.get()) {
      return redirect('/login')
    }
  }
  