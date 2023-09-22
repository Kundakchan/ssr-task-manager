// https://nuxt.com/docs/api/configuration/nuxt-config
import eslintPlugin from 'vite-plugin-eslint'
export default defineNuxtConfig({
  devtools: { enabled: true },

  vite: {
    plugins: [
      eslintPlugin()
    ]
  },

  runtimeConfig: {
    FIREBASE_CONNECTION: {
      apiKey: process.env.FIREBASE_API_KEY
    },
    public: {
      FIREBASE_CONNECTION: {
        apiKey: process.env.FIREBASE_API_KEY
      }
    }
  },

  modules: ["@nuxtjs/tailwindcss"]
})