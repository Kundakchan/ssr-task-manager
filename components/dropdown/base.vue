<script lang="ts" setup>
interface Props {
  visibility?: boolean,
  placement?: 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  visibility: false,
  placement: 'right'
})

const emit = defineEmits<{
  (e: 'click-toggler', value: MouseEvent): void
  (e: 'mouse-leave-dropdown', value: MouseEvent): void
}>()

const clickHander = ($event: MouseEvent) => {
  emit('click-toggler', $event)
}

const mouseLeaveHander = ($event: MouseEvent) => {
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
    @mouseleave="mouseLeaveHander"
  >
    <div @click="clickHander">
      <slot />
    </div>
    <div
      class="absolute transition duration-100 origin-top-right"
      :class="[
        classMapPlacement[props.placement],
        { 'opacity-100 scale-100': props.visibility, 'opacity-0 scale-0': !props.visibility }
      ]"
    >
      <slot name="overlay" />
    </div>
  </div>
</template>
