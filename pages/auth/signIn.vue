<script lang="ts" setup>

definePageMeta({
  layout: 'auth'
})

const userName = ref('')
const email = ref('')
const password = ref('')

const submit = async () => {
  await registration({ userName: userName.value, email: email.value, password: password.value })
  navigateTo({ name: 'index' })
}
</script>

<template>
  <form
    class="bg-white p-6 grid gap-6"
    @submit.prevent="submit"
  >
    <legend class="text-2xl">
      Регистрация
    </legend>

    <InputBase
      id="userName"
      v-model="userName"
      type="text"
    >
      <template #label>
        Имя пользователя
      </template>
    </InputBase>

    <InputBase
      id="email"
      v-model="email"
      type="email"
    >
      <template #label>
        email
      </template>
    </InputBase>
    <InputBase
      id="password"
      v-model="password"
      type="password"
    >
      <template #label>
        Пароль
      </template>
    </InputBase>

    <div class="flex justify-between gap-2 items-end flex-wrap">
      <ButtonBase type="primary">
        Регистрация
      </ButtonBase>
      <LinkBase :to="{ name: 'auth' }">
        Авторизоваться
      </LinkBase>
    </div>
  </form>
</template>