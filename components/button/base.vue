<script lang="ts" setup>

interface Props {
  type?: 'default' | 'primary' | 'danger' | 'success'
  shape?: 'default' | 'circle'
  shadow?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  shape: 'default',
  shadow: true,
  disabled: false
})

const emit = defineEmits<{
  (e: 'click', value: MouseEvent ): void
}>()

const clickHandler = ($event: MouseEvent) => {
  emit('click', $event)
}

const classMapType = {
  default: 'text-gray-700 border border-gray-700 hover:text-blue-500 hover:border-blue-600 active:text-blue-900 active:border-blue-900 focus:text-blue-500 focus:border-blue-600',
  primary: 'text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-600 focus:bg-blue-400 disabled:text-gray-300 disabled:cursor-not-allowed disabled:focus:bg-blue-500 disabled:active:bg-blue-500 disabled:hover:bg-blue-500',
  danger: 'text-white bg-red-600 hover:bg-red-500 focus:bg-red-500 active:bg-red-700',
  success: 'text-white bg-green-600 hover:bg-green-500 focus:bg-green-500 active:bg-green-700'
}

const classMapShape = {
  default: 'py-2 px-4',
  circle: 'rounded-full p-2'
}
</script>
<template>
  <button
    :disabled="props.disabled"
    class="font-medium flex focus:outline-none transition-colors duration-200 items-center shadow-lg"
    :class="[
      classMapShape[props.shape],
      classMapType[props.type]
    ]"
    @click="clickHandler($event)"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>