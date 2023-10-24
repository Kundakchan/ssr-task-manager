import { h } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (err) => {
    const error = err as Error
    const { $notification } = useNuxtApp()
    $notification.error(h('ul', {}, [
      h('li', {}, [`Сообщения: ${error.message}`])
    ]))
  })
})