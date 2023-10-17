import { useToast } from "vue-toastification"
import { h } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (err) => {
    const error = err as Error
    const { error: notification } = useToast()
    notification(h('ul', {}, [
      h('li', {}, [`Сообщения: ${error.message}`])
    ]))
  })
})