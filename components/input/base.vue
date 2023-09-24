<script lang="ts" setup>
defineOptions({
  inheritAttrs: false
})
interface Props {
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: ''
})
</script>

<template>
  <div class="grid gap-1">
    <label :for="props.id"><slot name="label" /></label>
    <input
      v-bind="$attrs"
      :id="props.id"
      class="border h-8 w-full py-1 px-2 focus:border-indigo-600 focus:outline-none"
    >
  </div>
</template>