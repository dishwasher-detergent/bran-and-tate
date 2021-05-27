<template>
  <WidgetContainer>
    <form @submit.stop.prevent="createUser" class="h-full w-full md:w-1/3 p-4 md:p-16">
        <h1 class="font-bold text-3xl pb-8">Create Account</h1>
        <label for="username" class="pb-4 block">
            <p class="pb-4">Email</p>
            <input v-model="login.email" type='text' id="username" class="input input-bordered w-full" required/>
        </label>
        <label for="password" class="pb-8 block">
            <p class="pb-4">Password</p>
            <input v-model="login.password" type='password' id="password" class="input input-bordered w-full" required/>
        </label>
        <div class="w-full flex items-center justify-center">
            <button aria-label="Create Account" class="btn btn-primary">
                Create Account
            </button>
        </div>
    </form>
  </WidgetContainer>
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