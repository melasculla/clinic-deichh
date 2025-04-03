import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
   compatibilityDate: '2024-11-01',
   devtools: { enabled: true },

   css: ['~/assets/css/main.css'],

   runtimeConfig: {
      public: {
         mail: '',
         phone: '',
         baseUrl: '',
      },
      adminEmails: '',
      auth: {
         secret: '',
         providers: {
            google: {
               client: '',
               secret: ''
            },
         }
      },
      postgres: {
         url: ''
      },
      redis: {
         host: '',
         port: '',
         password: '',
      },
      notify: {
         smtp: {
            host: '',
            user: '',
            password: '',
         }
      },
   },

   auth: {
      provider: {
         type: 'authjs',
         trustHost: false,
         defaultProvider: 'google',
         addDefaultCallbackUrl: true
      }
   },

   // googleFonts: {
   //    families: {
   //       'Arial': ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
   //    }
   // },

   postcss: {
      plugins: {
         '@tailwindcss/postcss': {},
      }
   },

   app: {
      pageTransition: {
         name: 'page',
         mode: 'in-out',
      },
      head: {
         meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { charset: 'utf-8' },
         ],
         // link: [{ rel: 'icon', type: 'image/webp', href: '/favicon.webp' }],
      }
   },

   future: {
      compatibilityVersion: 4
   },

   routeRules: {
      '/admin/**': {
         ssr: false
      },
      '*/admin/**': {
         ssr: false
      },
   },


   nitro: {
      routeRules: {
         '/api/**': { ssr: false },
         // '/_ipx/**': { headers: { 'cache-control': `public,max-age=691200,s-maxage=691200` } },
      },
      imports: {
         dirs: [
            './config',
            './types',
         ],
      },
      storage: {
         redis: {
            driver: 'redis',
            host: process.env.NUXT_REDIS_HOST,
            port: process.env.NUXT_REDIS_PORT,
            password: process.env.NUXT_REDIS_PASSWORD
         },
      },
      experimental: {
         tasks: true
      },
      scheduledTasks: {
         // https://crontab.guru
         // '*/20 * * * *': ['name']
      }
   },

   vite: {
      plugins: [
         tailwindcss(),
      ]
   },

   modules: [
      '@nuxt/image',
      '@sidebase/nuxt-auth',
      '@nuxt/scripts',
      '@nuxtjs/google-fonts',
   ],

   image: {
      provider: 'ipx'
   },
})