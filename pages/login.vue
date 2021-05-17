<template>
    <div class="w-full">
        <form @submit.stop.prevent="userLogin" class="h-full w-full md:w-1/3 p-4 md:p-16">
            <div class="w-full h-full rounded-xl shadow ring-1 ring-gray-300 p-8 bg-white">
                <h1 class="font-bold text-3xl pb-8">Login</h1>
                <label for="username" class="pb-4 block">
                    <p class="pb-4">Email</p>
                    <input v-model="login.email" type='text' id="username" class="py-2 px-4 rounded-xl border border-gray-300 bg-gray-50 w-full focus:ring-babyBlue" required/>
                </label>
                <label for="password" class="pb-8 block">
                    <p class="pb-4">Password</p>
                    <input v-model="login.password" type='password' id="password" class="py-2 px-4 rounded-xl border border-gray-300 bg-gray-50 w-full focus:ring-babyBlue" required/>
                </label>
                <div class="w-full flex items-center justify-center">
                    <button class="px-4 py-2 rounded-xl bg-blue-500 text-white">
                        Login
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
      }
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
      try {
        let response = await this.$auth.loginWith('supabase', this.login)
      } catch (err) {
        console.log(err)
      }
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