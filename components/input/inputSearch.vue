<script lang="ts" setup>
import type { Props, Emits } from './inputSearch'

const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<Emits>()

const value = ref(props.modelValue)
watchEffect(() => {
  emit('update:modelValue', value.value)
})

</script>

<template>
  <div class="flex w-full items-center">
    <InputBase
      v-model="value"
      class="h-10"
      placeholder="Имя пользователя или Email"
      :shadow="false"
    />
    <ButtonBase
      type="primary"
      @click="emit('click')"
    >
      Поиск
      <template #icon>
        <IconSearch class="mr-2" />
      </template>
    </ButtonBase>
  </div>
</template>