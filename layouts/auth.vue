<script lang="ts" setup></script>
<template>
  <main class="flex h-screen relative">
    <section class="w-full relative sm:w-1/2 md:w-2/3 background-clip">
      <img
        class="absolute left-0 top-0 w-full h-full object-cover"
        src="@/assets/images/auth/background.webp"
      >
    </section>
    <section class="absolute h-full flex items-center p-6 w-full sm:w-1/2 sm:static md:w-1/3">
      <article class="w-full">
        <slot />
      </article>
    </section>
  </main>
</template>

<style scoped>
.background-clip {
  clip-path: polygon(0 0, 100% 0, 100% 0, 40% 100%, 0 100%);
}
@media (max-width: 768px) {
  .background-clip {
    clip-path: none
  }
}
</style>