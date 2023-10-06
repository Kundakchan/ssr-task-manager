<script lang="ts" setup>

defineOptions({
  inheritAttrs: false
})
interface Props {
  id?: string
  modelValue?: string,
  htmlTag?: string
}
const props = withDefaults(defineProps<Props>(), {
  id: '',
  modelValue: '',
  htmlTag: 'input'
})

interface Emit {
  (e: 'update:modelValue', value: string ): void
}
const emit = defineEmits<Emit>()

const inputHandler = ($event: Event) => {
  const input = $event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}

</script>

<template>
  <div class="grid gap-1 w-full">
    <label
      v-if="props.id"
      :for="props.id"
    ><slot name="label" /></label>
    <component
      :is="props.htmlTag"
      v-bind="$attrs"
      :id="props.id"
      :value="modelValue"
      class="input"
      @input="inputHandler"
    />
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .input {
    @apply border h-8 w-full py-1 px-2 focus:border-indigo-600 focus:outline-none;
  }
}
</style>