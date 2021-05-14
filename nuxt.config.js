export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'dashboard',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {
                charset: 'utf-8'
            }, {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }, {
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
                rel: "preconnect",
                href: "https://fonts.gstatic.com"
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins : [
        {
            src: '~/plugins/vue-grid.js',
            ssr: false
        },
        '@/plugins/supabase.client.js'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/tailwindcss'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxt/content',
        '@nuxtjs/dotenv',
        '@nuxtjs/axios',
        '@nuxtjs/auth-next'
    ],
    // router : {},
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
    auth: {
    strategies: {
        social: {
        scheme: 'oauth2',
        endpoints: {
            authorization: 'https://accounts.google.com/o/oauth2/auth',
            token: undefined,
            userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
            logout: 'https://example.com/logout'
        },
        token: {
            property: 'access_token',
            type: 'Bearer',
            maxAge: 1800
        },
        refreshToken: {
            property: 'refresh_token',
            maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'token',
        grantType: 'authorization_code',
        accessType: undefined,
        redirectUri: undefined,
        logoutRedirectUri: undefined,
        clientId: 'SET_ME',
        scope: ['openid', 'profile', 'email'],
        state: 'UNIQUE_AND_NON_GUESSABLE',
        codeChallengeMethod: '',
        responseMode: '',
        acrValues: '',
        // autoLogout: false
        }
    }
    }
}
