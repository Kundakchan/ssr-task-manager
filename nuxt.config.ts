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
    public: {
      FIREBASE_CONNECTION: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
      }
    }
  },

  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/device']
})