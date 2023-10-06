<script lang="ts" setup>
import type { NuxtError } from 'nuxt/app'
defineProps<{ error: NuxtError }>()
</script>

<template>
  <section class="flex flex-col gap-6 items-center">
    <img
      src="~/assets/images/error/server_error.svg"
      alt="server error"
    >
    <h1 class=" text-gray-500 text-5xl font-bold">
      Error: {{ error.statusCode }}
    </h1>
    <p class=" text-gray-400 text-2xl">
      {{ error.message }}
    </p>
  </section>
</template>