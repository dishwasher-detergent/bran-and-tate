<template>
    <div class="p-4 flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0">
        <div
            class="p-4 ring-1 ring-gray-300 rounded-xl overflow-hidden bg-white w-full"
        >
            <form @submit.stop.prevent="createUser" class="h-full w-full md:w-1/3 p-4 md:p-16">
                <h1 class="font-bold text-3xl pb-8">Create Account</h1>
                <label for="username" class="pb-4 block">
                    <p class="pb-4">Email</p>
                    <input v-model="login.email" type='text' id="username" class="py-2 px-4 rounded-xl border border-gray-300 bg-gray-50 w-full focus:ring-babyBlue" required/>
                </label>
                <label for="password" class="pb-8 block">
                    <p class="pb-4">Password</p>
                    <input v-model="login.password" type='password' id="password" class="py-2 px-4 rounded-xl border border-gray-300 bg-gray-50 w-full focus:ring-babyBlue" required/>
                </label>
                <div class="w-full flex items-center justify-center">
                    <button aria-label="Create Account" class="px-4 py-2 rounded-xl bg-blue-500 text-white">
                        Create Account
                    </button>
                </div>
            </form>
        </div>
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
  methods: {
    async createUser(){
        const { user, session, error } = await this.$supabase.auth.signUp(this.login)
    }
  }
}
</script>