<script lang="ts" setup>
interface Props {
  visibility?: boolean,
  placement?: 'left' | 'right'
  overlayFull?: boolean 
}

const props = withDefaults(defineProps<Props>(), {
  visibility: false,
  placement: 'right',
  overlayFull: false
})

const emit = defineEmits<{
  (e: 'click-toggler', value: MouseEvent): void
  (e: 'mouse-leave-dropdown', value: MouseEvent): void
}>()

const clickHandler = ($event: MouseEvent) => {
  emit('click-toggler', $event)
}

const mouseLeaveHandler = ($event: MouseEvent) => {
  if (props.visibility) {
    emit('mouse-leave-dropdown', $event)
  }
}

const classMapPlacement = {
  left: 'left-0',
  right: 'right-0'
}
</script>

<template>
  <div
    class="relative"
    @mouseleave="mouseLeaveHandler"
  >
    <div @click="clickHandler">
      <slot />
    </div>
    <div
      class="absolute transition duration-100 origin-top-right z-10"
      :class="[
        classMapPlacement[props.placement],
        { 'opacity-100 scale-100': props.visibility, 'opacity-0 scale-0': !props.visibility },
        { 'w-full': props.overlayFull }
      ]"
    >
      <slot name="overlay" />
    </div>
  </div>
</template>
