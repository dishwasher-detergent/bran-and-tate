export default function ({ store, redirect }) {
    if(localStorage.getItem('session')) {
      return redirect('/login')
    }
  }
  