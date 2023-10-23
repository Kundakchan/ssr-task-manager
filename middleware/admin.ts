import type { AuthCookie } from '~/types/auth'

export default defineNuxtRouteMiddleware(() => {
  const cookieUser = useCookie<AuthCookie | null>('cookieUser')
  if (!cookieUser.value?.role || cookieUser.value.role !== 'admin') return navigateTo({ name: "index" })
})