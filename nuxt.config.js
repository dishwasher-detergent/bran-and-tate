export default {
  ssr: false,

  head: {
    title: 'Bran and Tate',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      }
    ],
    script: [
      {
        src: 'https://js.stripe.com/v3/'
      }
    ]
  },

  css: ['~/assets/main.css'],
  pageTransition: 'my-page',

  plugins: ['@/plugins/supabase.client.js', '~/plugins/vueimagekit.js'],

  components: true,

  target: 'static',

  buildModules: ['@nuxtjs/tailwindcss', '@nuxt/image'],

  modules: ['@nuxt/content', '@nuxtjs/dotenv', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  axios: {
    baseURL: process.env.NUXT_WEBSITE
  },

  build: {},

  auth: {
    strategies: {
      supabase: {
        scheme: '~/schemes/supabaseScheme'
        /* ... */
      }
    }
  },

  image: {
    imagekit: {
      baseURL: 'https://ik.imagekit.io/branandtate/'
    }
  }
}
