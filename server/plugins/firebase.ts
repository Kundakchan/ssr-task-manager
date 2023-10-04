import { initializeApp } from "firebase/app"

export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()
  initializeApp(config.public.FIREBASE_CONNECTION)
})