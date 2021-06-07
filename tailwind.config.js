const colors = require('tailwindcss/colors')

module.exports = {
    purge: {
        content: [
            './components/**/*.{vue,js}',

            './layouts/**/*.vue',

            './pages/**/*.vue',

            './plugins/**/*.{js,ts}',

            './nuxt.config.{js,ts}',
        ],
        options: {
            safelist: [
                'alert-warning',
                'alert-info'
            ]
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            // Build your palette here
            transparent: 'transparent',
            current: 'currentColor',
            gray: colors.blueGray,
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
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
    themes: [
        'dark',
        {
            'main': {                          /* your theme name */
                'primary' : '#3B82F6',           /* Primary color */
                'primary-focus' : '#2563EB',     /* Primary color - focused */
                'primary-content' : '#ffffff',   /* Foreground content color to use on primary color */

                'secondary' : '#f6d860',         /* Secondary color */
                'secondary-focus' : '#f3cc30',   /* Secondary color - focused */
                'secondary-content' : '#ffffff', /* Foreground content color to use on secondary color */

                'accent' : '#37cdbe',            /* Accent color */
                'accent-focus' : '#2aa79b',      /* Accent color - focused */
                'accent-content' : '#ffffff',    /* Foreground content color to use on accent color */

                'neutral' : '#3d4451',           /* Neutral color */
                'neutral-focus' : '#2a2e37',     /* Neutral color - focused */
                'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

                'base-100' : '#ffffff',          /* Base color of page, used for blank backgrounds */
                'base-200' : '#F8FAFC',          /* Base color, a little darker */
                'base-300' : '#CBD5E1',          /* Base color, even more darker */
                'base-content' : '#1E293B',      /* Foreground content color to use on base color */

                'info' : '#3B82F6',              /* Info */
                'success' : '#22C55E',           /* Success */
                'warning' : '#F59E0B',           /* Warning */
                'error' : '#EF4444',             /* Error */
            },
        },
    ],
  },
}
