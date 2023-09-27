<script lang="ts" setup></script>

<template>
  <section class="px-6 sm:py-6">
    <div class="w-full flex justify-center">
      <h1 class="font-bold text-gray-800 text-3xl sm:text-6xl">
        <span class="text-red-600">Todo</span> manager
      </h1>
    </div>
    <div class="w-full mt-4 sm:mt-6 flex justify-center">
      <InputCreate
        class="max-w-screen-lg"
        placeholder="Наименования задачи"
      />
    </div>
    <div class="w-full mt-4 sm:mt-6">
      <TaskView />
    </div>
  </section>
</template>