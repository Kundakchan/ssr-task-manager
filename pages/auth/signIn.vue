<script lang="ts" setup>

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <form class="bg-white p-6 grid gap-6">
    <legend class="text-2xl">
      Регистрация
    </legend>

    <InputBase
      id="userName"
      type="text"
    >
      <template #label>
        Имя пользователя
      </template>
    </InputBase>

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
      <ButtonBase>Регистрация</ButtonBase>
      <LinkBase :to="{ name: 'auth' }">
        Авторизоваться
      </LinkBase>
    </div>
  </form>
</template>