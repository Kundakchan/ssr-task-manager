<script lang="ts" setup>
const name = ref('')
const descriptions = ref('')
const status = ref('new')
const modal = ref(false)

const statuses = ref([
  {
    value: 'new',
    label: 'Новый'
  },
  {
    value: 'proccesing',
    label: 'Впроцессе'
  },
  {
    value: 'succsess',
    label: 'Выполнен'
  },
  {
    value: 'cancel',
    label: 'Отменён'
  }
])

const modalToggle = () => {
  modal.value = !modal.value
}

const submit = () => {
  console.log('submit', {
    name: name.value,
    descriptions: descriptions.value,
    status: status.value
  })
  modalToggle()
}
</script>

<template>
  <div class="flex w-full items-center">
    <InputBase
      v-model="name"
      placeholder="Наименования задачи"
      class="h-10"
      :shadow="false"
    />
    <ButtonBase
      :disabled="!name"
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
        <ModalBase
          :visibility="modal"
          :title="'Создания задачи'"
          :applay-title="'Создать'"
          @close="modalToggle"
          @cancel="modalToggle"
          @applay="submit"
        >
          <form
            class="flex flex-wrap items-end p-3"
            @submit.prevent
          >
            <div class="w-2/3 p-3">
              <InputBase
                :id="'name'"
                v-model="name"
                class="h-10"
              >
                <template #label>
                  <span class="text-gray-800">Наименования</span>
                </template>
              </InputBase>
            </div>
            <div class="w-1/3 p-3">
              <InputSelect
                :id="'status'"
                v-model="status"
                :items="statuses"
              >
                <template #label>
                  <span class="text-gray-800">Статус</span>
                </template>
              </InputSelect>
            </div>
            <div class="w-full p-3">
              <InputBase
                :id="'descriptions'"
                v-model="descriptions"
                :html-tag="'textarea'"
                class=" h-40"
              >
                <template #label>
                  <span class="text-gray-800">Подробное описания</span>
                </template>
              </InputBase>
            </div>
          </form>
        </ModalBase>
      </Teleport>
    </ClientOnly>
  </div>
</template>