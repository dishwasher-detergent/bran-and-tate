import {createClient} from '@supabase/supabase-js'
const SUPABASE_KEY = process.env.NUXT_ENV_API_KEY
export default({
    app
}, inject) => {
	const supabaseUrl = process.env.NUXT_ENV_API_URL
    const supabaseKey = SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    inject('supabase', supabase)
}
