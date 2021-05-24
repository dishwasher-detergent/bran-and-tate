import { LocalScheme } from '~auth/runtime'

export default class SupabaseScheme extends LocalScheme {
  async fetchUser () {
    const supabase = this.$auth.ctx.$supabase.auth

    if (!supabase.user()) {
      return
    }

    this.$auth.setUser(supabase.user())
  }

  async logout() {
    const supabase = this.$auth.ctx.$supabase.auth
    await supabase.signOut()
    return this.$auth.reset()
  }

  reset() {
    this.$auth.setUser(false)
  }

  async login(options) {
    const supabase = this.$auth.ctx.$supabase.auth
    const { user, error } = await supabase.signIn(options)

    if (error) {
      this.$auth.callOnError(error)
      return Promise.reject(error)
    }

    this.$auth.setUser(user)
  }

  check() {
    const supabase = this.$auth.ctx.$supabase.auth

    const response = {
      valid: supabase.user() !== undefined,
      tokenExpired: false
    }

    return response
  }
}