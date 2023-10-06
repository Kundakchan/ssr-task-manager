<script lang="ts" setup></script>

<template>
  <main class="grid h-screen grid-rows-layout">
    <HeaderBase class="h-16" />
    <slot />
  </main>
  <section
    id="space-modal"
    class="fixed top-0 left-0"
  />
</template>