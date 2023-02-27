// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,
    plugins: ['~/plugins/pagination.ts'],
    css: [
        'vue-awesome-paginate/dist/style.css',
        'vuetify/lib/styles/main.sass',
        '~/assets/styles/main.scss'
      ],
      build: {
        transpile: ['vuetify'],
      },
      vite: {
        define: {
          'process.env.DEBUG': false,
        },
      },

      modules: ['@pinia/nuxt'],
      runtimeConfig: {
        // The private keys which are only available server-side
        apiSecret: '',
        // Keys within public are also exposed client-side
        public: {
          apiBase: ''
        }
      }
})
