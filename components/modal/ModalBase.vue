<script lang="ts" setup>
interface Props {
  visibility?: boolean
  title?: string
  cancelTitle?: string
  applayTitle?: string


}
const props = withDefaults(defineProps<Props>(), {
  visibility: false,
  title: 'Заголовок модального окна',
  cancelTitle: 'Отмена',
  applayTitle: 'Применить'
})

interface Emits {
  (e: 'close', value: void): void
  (e: 'cancel', value: void): void
  (e: 'applay', value: void): void
}
const emit = defineEmits<Emits>()

</script>

<template>
  <div
    v-if="props.visibility"
    class="h-screen w-screen grid justify-center items-center bg-gray-900 backdrop-blur-sm bg-opacity-70 relative"
  >
    <div class=" bg-white max-w-2xl z-10">
      <slot name="header">
        <div class="p-6 border-b flex justify-between gap-2">
          <h4 class=" text-gray-800 text-2xl">
            {{ props.title }}
          </h4>
          <ButtonBase
            shape="circle"
            @click="emit('close')"
          >
            <template #icon>
              <IconClose />
            </template>
          </ButtonBase>
        </div>
      </slot>
      <slot>
        <div class="p-6">
          Основной контент модального окна
        </div>
      </slot>
      <slot name="footer">
        <div class="p-6 border-t flex justify-end gap-2">
          <ButtonBase
            type="danger"
            @click="emit('cancel')"
          >
            {{ props.cancelTitle }}
          </ButtonBase>
          <ButtonBase
            type="primary"
            @click="emit('applay')"
          >
            {{ props.applayTitle }}
          </ButtonBase>
        </div>
      </slot>
    </div>
    <div
      class="background h-screen w-screen absolute z-0 bg-transparent"
      @click.stop="emit('close')"
    />
  </div>
</template>