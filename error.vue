<script lang="ts" setup>
import type { NuxtError } from 'nuxt/app'
import Error404 from '@/components/error/404.vue'
import Error403 from '@/components/error/403.vue'
import Error500 from '@/components/error/500.vue'

defineProps<{ error: NuxtError }>()

const component = { Error404, Error403, Error500 }

</script>

<template>
  <main class="w-full h-screen grid items-center justify-center p-6">
    <component
      :is="component[`Error${error.statusCode}`]"
      :error="error"
    />
  </main>
</template>