<script lang="ts" setup>

interface Tab {
  key: string,
  label: string,
  handler?: () => void
}
interface Props {
  tabs: Tab[],
  active?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: ''
})
</script>

<template>
  <div class="flex gap-4">
    <button
      v-for="(tab) in props.tabs"
      :key="tab.key"
      class="tab"
      :class="[
        { 'text-blue-700 border-blue-700': props.active === tab.key }
      ]"
      @click="tab.handler"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .tab {
    @apply py-2 text-gray-800 border-b-2 border-transparent transition-colors duration-100 focus:outline-none focus:border-blue-500 focus:text-blue-500 hover:border-blue-500 hover:text-blue-500;
  }
}

</style>
