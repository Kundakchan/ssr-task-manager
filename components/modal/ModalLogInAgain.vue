<script lang="ts" setup>
import type { Props, Emits } from './ModalLogInAgain'

defineProps<Props>()
const emit = defineEmits<Emits>()
const password = ref('')

const close = () => {
  emit('update:visibility', false)
  emit('cancel')
}

const submit = () => {
  emit('ok', { password: password.value })
  close()
}
</script>

<template>
  <ModalBase
    :visibility="visibility"
    :title="'Повторно авторизозацыя'"
    :applay-title="'Подтвердить'"
    @close="close"
    @cancel="close"
    @applay="submit"
  >
    <div class="p-6">
      <InputBase
        v-model="password"
        type="password"
        placeholder="Старый пароль"
      />
    </div>
  </ModalBase>
</template>