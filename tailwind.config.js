const colors = require('tailwindcss/colors')

module.exports = {
    purge: [

        './components/**/*.{vue,js}',

        './layouts/**/*.vue',

        './pages/**/*.vue',

        './plugins/**/*.{js,ts}',

        './nuxt.config.{js,ts}',

    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            // Build your palette here
            transparent: 'transparent',
            current: 'currentColor',
            gray: colors.warmGray,
            red: colors.rose,
            green: colors.green,
            indigo : colors.indigo,
            blue : colors.blue,
            yellow : colors.amber,
            white: '#ffffff',
            peach: '#ffe5c2',
            babyBlue: '#cce6ff'
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
}
