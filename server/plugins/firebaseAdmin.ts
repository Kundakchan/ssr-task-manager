import { initializeApp, cert } from 'firebase-admin/app'
import type { ServiceAccount } from 'firebase-admin/app'

export default defineNitroPlugin(() => {
  const config = useRuntimeConfig()
  initializeApp({
    credential: cert(config.FIREBASE_ADMIN as ServiceAccount)
  })
})