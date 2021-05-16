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
// export default {
//     data(){
//         return{
//             type: 'signIn',
//             password: '',
//             email: ''
//         }
//     },
//   created () {
//     this.$supabase.auth.onAuthStateChange(async (event, session) => {
//         this.request({ event, session })
//     })
//   },
//   async mounted() {
//     const { type = null } = this.$route.query;
//     if (type && (type === 'signIn' || type === 'signUp' || type === 'signOut')) {
//       this.type = type;
//       if (type === 'signOut') {
//         await this.signOut()
//       }
//     }
//   },
//   methods: {
//     async handleAuth() {
//         await this.signIn()
//     },
//     async signIn() {
//         const { email, password } = this;
//         const { user, session, error } = await this.$supabase.auth.signIn({ email: email, password: password })
//         if (error) {
//             // Handle error
//             console.error(error)
//         } else {
//             console.log(this.$supabase.auth.user())
//             this.$auth.strategy.token.set(session.access_token)
//         }
//     },
//     async signOut() {
//         const { error } = await this.$supabase.auth.signOut()
//         if (error) {
//             // Handle error
//             console.error(error)
//         } else {
//             this.$auth.strategy.token.reset()
//         }
//     },
//     handleRedirect(event) {
//         switch (event) {
//             case 'SIGNED_IN':
//                 this.$router.push('/Dashboard')
//                 break;
//             case 'SIGNED_OUT':
//                 this.$router.push('/')
//                 break;
//             default:
//                 console.log({ event })
//                 break;
//         }
//     },
//     request({ event, session }) {
//         if (!event) { throw new Error('Missing event') }
//         this.handleRedirect(event)
//     }
//   }
// }

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
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
    async signOut() {
       try {
        let response = await this.$auth.logout('supabase')
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
  }
}

</script>