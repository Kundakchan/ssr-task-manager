<script lang="ts" setup></script>

<template>
  <section class="px-6 sm:py-6">
    <div class="flex justify-center">
      <h1 class="font-bold text-gray-800 text-3xl sm:text-6xl">
        <span class="text-red-600">П</span>ользователи
      </h1>
    </div>
    <div class="w-full mt-4 sm:mt-6 flex justify-center">
      <InputSearch
        class="max-w-screen-lg"
        placeholder="Имя пользователя или Email"
      />
    </div>
    <div class="w-full mt-4 sm:mt-6">
      <UserView />
    </div>
  </section>
</template>