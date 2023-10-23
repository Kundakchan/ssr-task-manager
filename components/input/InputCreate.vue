<script lang="ts" setup>
import type { Source } from '../modal/ModalTaskEdit'
const modal = ref(false)
const source = ref<Source>({
  name: '',
  status: 'new'
})

const modalToggle = () => {
  modal.value = !modal.value
}

const clearInput = () => {
  source.value.name = ''
  source.value.status = 'new'
}

</script>

<template>
  <div class="flex w-full items-center">
    <InputBase
      v-model="source.name"
      placeholder="Наименования задачи"
      class="h-10"
      :shadow="false"
    />
    <ButtonBase
      :disabled="!source.name"
      type="primary"
      @click="modalToggle"
    >
      Создать
      <template #icon>
        <IconDocumentPlus class="mr-2" />
      </template>
    </ButtonBase>

    <ClientOnly>
      <Teleport to="#space-modal">
        <ModalTaskEdit
          v-model:visibility="modal"
          :source="source"
          @close="clearInput"
        />
      </Teleport>
    </ClientOnly>
  </div>
</template>