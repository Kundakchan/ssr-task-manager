<script lang="ts" setup>

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <form class="bg-white p-6 grid gap-6">
    <legend class="text-2xl">
      Авторизация
    </legend>

    <InputBase
      id="email"
      type="email"
    >
      <template #label>
        email
      </template>
    </InputBase>
    <InputBase
      id="password"
      type="password"
    >
      <template #label>
        Пароль
      </template>
    </InputBase>

    <div class="flex justify-between gap-2 items-end flex-wrap">
      <ButtonBase :type="'primary'">
        Авторизоваться
      </ButtonBase>
      <LinkBase :to="{ name: 'auth-signIn' }">
        Регистрация
      </LinkBase>
    </div>
  </form>
</template>