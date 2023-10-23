import type { AuthCookie } from "~/types/auth"

export default defineNuxtRouteMiddleware(() => {
  const cookieUser = useCookie<AuthCookie | null>('cookieUser')
  if (!cookieUser.value) return navigateTo({ name: "auth" })
})
