<template>
    <div class="w-full">
        <div class="h-full w-1/3 p-16">
            <div class="w-full h-full rounded-xl shadow ring-1 ring-gray-200 p-8 bg-white">
                <h1 class="font-bold text-3xl pb-8">Login</h1>
                <label for="username" class="pb-4 block">
                    <p class="pb-4">Email</p>
                    <input type='text' id="username" class="py-2 px-4 rounded-xl ring-2 ring-gray-200 shadow w-full focus:ring-babyBlue"/>
                </label>
                <label for="password" class="pb-8 block">
                    <p class="pb-4">Password</p>
                    <input type='password' id="password" class="py-2 px-4 rounded-xl ring-2 ring-gray-200 shadow w-full focus:ring-babyBlue"/>
                </label>
                <div class="w-full flex items-center justify-center">
                    <button @click="login" class="px-4 py-2 rounded-xl bg-blue-500 text-white">
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        async login(){
            // const { user, session, error } = await this.$store.state.client.auth.signIn({
            //     email: 'kenny_bass@outlook.com',
            //     password: 'Bakerismydog1!',
            // })
            // console.log(user)
            // console.log(session)

        }
    }
}
</script>
