<script lang="ts" setup>
const modal = ref(false)
const record = ref({
  name: '',
  status: 'new'
})

const modalToggle = () => {
  modal.value = !modal.value
}

const clearInput = () => {
  record.value.name = ''
  record.value.status = 'new'
}

</script>

<template>
  <div class="flex w-full items-center">
    <InputBase
      v-model="record.name"
      placeholder="Наименования задачи"
      class="h-10"
      :shadow="false"
    />
    <ButtonBase
      :disabled="!record.name"
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
          :record="record"
          @close="clearInput"
        />
      </Teleport>
    </ClientOnly>
  </div>
</template>