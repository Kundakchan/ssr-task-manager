export default defineNuxtRouteMiddleware(() => {
  const accessToken = useCookie("accessToken").value
  if (!accessToken) return navigateTo({ name: "auth" })
})
