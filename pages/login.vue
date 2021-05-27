<template>
    <div class="w-full">
        <form @submit.stop.prevent="userLogin" class="h-full w-full md:w-1/3 p-4 md:p-16">
            <div class="w-full h-full rounded-2xl shadow ring-1 ring-gray-300 p-8 bg-white">
                <h1 class="font-bold text-3xl pb-8">Log In</h1>
                <div v-if="error" class="alert alert-error">
                  <div class="flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current"><!----> <!----> <!----> <!----> 
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!----> <!---->
                    </svg> 
                    <label>{{error}}</label>
                  </div>
                </div>
                <div class="form-control pb-8">
                  <label class="label" for="email">
                    <span class="label-text">Email</span>
                  </label> 
                  <input v-model="login.email" id="email" type="text" placeholder="Email" class="input input-bordered" required>
                  <label class="label" for="password">
                    <span class="label-text">Password</span>
                  </label> 
                  <input v-model="login.password" id="password" type="password" placeholder="Password" class="input input-bordered" required>
                </div>
                <div class="w-full flex items-center justify-center">
                    <button aria-label="Login" :class="'btn btn-primary ' + (loading ? 'loading' : '')">
                        Log In
                    </button>
                </div>
            </div>
        </form>

    </div>
</template>
<script>

export default {
  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      error: null,
      loading: false
    }
  },
  async mounted() {
    const { type = null } = this.$route.query;
    if (type && (type === 'signIn' || type === 'signUp' || type === 'signOut')) {
      this.type = type;
      if (type === 'signOut') {
        await this.signOut()
      }
    }
  },
  methods: {
    async userLogin() {
      this.loading = true
      try {
        let response = await this.$auth.loginWith('supabase', 
          {
            email: this.login.email.toLowerCase(),
            password: this.login.password
          }
        )
      } catch (err) {
        this.error = err.message
      }
      this.loading = false
    },
    async signOut() {
       try {
        let response = await this.$auth.logout('supabase')
      } catch (err) {
        console.log(err)
      }
    },
  }
}

</script>