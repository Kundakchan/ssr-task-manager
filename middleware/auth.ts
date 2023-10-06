import type { User } from "firebase/auth"

export default defineNuxtRouteMiddleware(() => {
  const cookieUser = useCookie<User | null>('cookieUser')
  if (!cookieUser.value) return navigateTo({ name: "auth" })
})
