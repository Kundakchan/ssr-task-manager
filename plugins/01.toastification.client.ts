import Toast, { type PluginOptions, useToast } from "vue-toastification"
import "vue-toastification/dist/index.css"

export default defineNuxtPlugin((nuxtApp) => {
  const options: PluginOptions = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
  }
  nuxtApp.vueApp.use(Toast, options)
  return {
    provide: {
      notification: useToast()
    }
  }
})