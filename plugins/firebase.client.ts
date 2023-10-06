import { initializeApp } from "firebase/app"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const firebase = initializeApp(config.public.FIREBASE_CONNECTION)
  initFirebase()
  nuxtApp.vueApp.provide('firebase', firebase)
  nuxtApp.provide('firebase', firebase)
})