<script lang="ts" setup>
import type { ProfileUpdate } from '~/types/users'

definePageMeta({
  middleware: "auth"
})

const user = computed(() => useAuthStorage().value.user)
const userData = ref<ProfileUpdate>({
  displayName: '',
  email: '',
  password: '',
  oldPassword: ''
})

watchEffect(() => {
  userData.value = {
    ...userData.value,
    displayName: user.value?.displayName ? user.value?.displayName : '',
    email: user.value?.email ? user.value?.email : ''
  }
})

const modalLogInAgain = ref(false)
const openModalLogInAgain = () => {
  modalLogInAgain.value = true
}

const submit = async ({ password }: { password: string }) => {
  if (!password) return
  userData.value.oldPassword = password
  profileUpdate(userData.value)
}

</script>

<template>
  <section class="px-6 sm:py-6">
    <div class="pl-6 border-l-4 border-red-600 sm:ml-16">
      <h1 class="font-bold text-gray-800 text-3xl sm:text-6xl">
        <span class="text-red-600">Настройка</span> профиля
      </h1>
      <form
        class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 grid gap-6"
        @submit.prevent="openModalLogInAgain"
      >
        <InputBase
          id="username"
          v-model="userData.displayName"
        >
          <template #label>
            Имя
          </template>
        </InputBase>
        <InputBase
          id="email"
          v-model="userData.email"
          type="email"
        >
          <template #label>
            Email
          </template>
        </InputBase>
        <InputBase
          id="password"
          v-model="userData.password"
          type="password"
        >
          <template #label>
            Новый пароль
          </template>
        </InputBase>
        <span class=" text-gray-800 font-bold">Роль: Пользователь</span>
        <div>
          <ButtonBase
            type="primary"
          >
            Сохранить
          </ButtonBase>
        </div>
      </form>
    </div>
    <ClientOnly>
      <Teleport to="#space-modal">
        <ModalLogInAgain
          v-model:visibility="modalLogInAgain"
          @ok="submit"
        />
      </Teleport>
    </ClientOnly>
  </section>
</template>