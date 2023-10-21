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
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
      }
    },
    FIREBASE_ADMIN: process.env.FIREBASE_ADMIN ? JSON.parse(process.env.FIREBASE_ADMIN) : null
  },

  modules: ["@nuxtjs/tailwindcss", '@nuxtjs/device']
})