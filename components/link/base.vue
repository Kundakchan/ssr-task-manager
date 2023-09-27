<script lang="ts" setup>
import type { NuxtLinkProps } from 'nuxt/app';
const props = defineProps<{
  to: NuxtLinkProps['to']
}>()
</script>
<template>
  <NuxtLink
    :to="props.to"
    class="text-blue-500 underline font-medium"
  >
    <slot />
  </NuxtLink>
</template>