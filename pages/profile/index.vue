<script lang="ts" setup></script>

<template>
  <section class="px-6 sm:py-6">
    <div class="pl-6 border-l-4 border-red-600 sm:ml-16">
      <h1 class="font-bold text-gray-800 text-3xl sm:text-6xl">
        <span class="text-red-600">Настройка</span> профиля
      </h1>
      <form class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 grid gap-6">
        <InputBase id="username">
          <template #label>
            Имя
          </template>
        </InputBase>
        <InputBase
          id="email"
          type="email"
        >
          <template #label>
            Email
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
        <span class=" text-gray-800 font-bold">Роль: Пользователь</span>
        <div>
          <ButtonBase type="primary">
            Сохранить
          </ButtonBase>
        </div>
      </form>
    </div>
  </section>
</template>