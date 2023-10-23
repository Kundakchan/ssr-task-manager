<script lang="ts" setup>
import type { Props, Emits } from './ModalTaskEdit'
const props = withDefaults(defineProps<Props>(), {
  mode: 'created'
})

const emit = defineEmits<Emits>()

const close = () => {
  task.value = { id: '', name: '', description: '', status: 'new'}
  emit('update:visibility', false)
  emit('close')
}
const { attributes } = toRefs(useTask().value)

const task = ref({...props.source})

watch(() => props.source, (record) => {
  task.value = { ...record }
}, { deep: true })

const submit = () => {
  if (props.mode === 'created') {
    taskCreating({
      name: task.value.name || '',
      description: task.value.description || '',
      status: task.value.status
    })
  }
  if (props.mode === 'edit' && task.value.id) {
    taskUpdate({
      id: task.value.id,
      name: task.value.name || '',
      description: task.value.description || '',
      status: task.value.status
    })
  }
  close()
}

const title = computed(() => props.mode === 'created' ? 'Создания задачи' : 'Редактирования задачи')


</script>

<template>
  <ModalBase
    :visibility="visibility"
    :title="title"
    :apply-title="'Создать'"
    @close="close"
    @cancel="close"
    @apply="submit"
  >
    <form
      class="flex flex-wrap items-end p-3"
      @submit.prevent
    >
      <div class="w-2/3 p-3">
        <InputBase
          :id="'name'"
          v-model="task.name"
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
          v-model="task.status"
          :items="attributes.statuses"
        >
          <template #label>
            <span class="text-gray-800">Статус</span>
          </template>
        </InputSelect>
      </div>
      <div class="w-full p-3">
        <InputBase
          :id="'description'"
          v-model="task.description"
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
</template>