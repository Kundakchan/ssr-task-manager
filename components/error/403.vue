<script lang="ts" setup>
import type { NuxtError } from 'nuxt/app'
defineProps<{ error: NuxtError }>()

const handerCelarError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <section class="flex flex-col gap-6 items-center">
    <img
      src="~/assets/images/error/not_found.svg"
      alt="not found"
    >
    <h1 class=" text-gray-500 text-5xl font-bold">
      Error: {{ error.statusCode }}
    </h1>
    <p class=" text-gray-400 text-2xl">
      {{ error.message }}
    </p>

    <ButtonBase @click="handerCelarError">
      Вернуться на главную
    </ButtonBase>
  </section>
</template>