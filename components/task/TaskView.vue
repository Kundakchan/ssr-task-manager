<script lang="ts" setup>
import { taskRemove } from '~/composables/useTasks'
import type { TableColumn } from '../table/Table'

import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
dayjs.locale(ru)

const tabs = [
  {
    key: 'all',
    label: 'Все',
    handler: () => {
      console.log('all')
    }
  },
  {
    key: 'new',
    label: 'Новые',
    handler: () => {
      console.log('new')
    }
  },
  {
    key: 'processing',
    label: 'В процессе',
    handler: () => {
      console.log('processing')
    }
  },
  {
    key: 'sucsess',
    label: 'Выполнин',
    handler: () => {
      console.log('sucsess')
    }
  },
  {
    key: 'cancel',
    label: 'Отменён',
    handler: () => {
      console.log('cancel')
    }
  }
]

interface Column extends TableColumn {
  type: 'text' | 'action' | 'tag' | 'date'
}

const columns: Column[] = [
  {
    id: 'created',
    label: 'Дата создания',
    width: 180,
    type: 'date'
  },
  {
    id: 'updated',
    label: 'Дата обновления',
    width: 180,
    type: 'date'
  },
  {
    id: 'name',
    label: 'Названия',
    minWidth: 200,
    type: 'text'
  },
  {
    id: 'status',
    label: 'Статус',
    width: 100,
    type: 'tag'
  },
  {
    id: 'actions',
    label: 'Действия',
    width: 100,
    type: 'action'
  }
]

const { list, loading, attributes } = toRefs(useTask().value)

const removeHander = (id: string) => {
  taskRemove(id)
}

const statusLabel = (status: string) => {
  return attributes.value.statusLabel[status]
}

const dateFormat = (date: string) => {
  if (!date) return 'Нет данных'
  return dayjs(date).format('D MMMM YYYY')
}

onMounted(async () => {
  await tasksGet()
})

const modal = ref(false)
const source = ref({
  id: '',
  name: '',
  description: '',
  status: 'new',
  
})
const editHandler = async (id: string) => {
  const data = await taskGet(id)
  if (!data) return
  source.value = {
    id: data.id,
    name: data.name,
    description: data.description,
    status: data.status
  }
  modal.value = true
}

</script>

<template>
  <div class="shadow-lg">
    <div class="px-4 pt-2">
      <TabsBase
        :tabs="tabs"
        :active="'new'"
      />
    </div>
    <div class="mt-2">
      <TableBase
        :columns="columns"
        :data-source="list"
        :loading="loading"
        :class-table="'w-full'"
        :class-header-cell="'text-left bg-gray-100 p-4 border-r last:border-r-0'"
        :class-rows="'border-b'"
      >
        <template
          v-for="(column) in columns"
          #[column.id]="{ record, field }"
          :key="`span-${column.id}`"
        >
          <template v-if="column.type === 'action'">
            <div class="py-1 px-4 flex gap-2">
              <ButtonBase
                :shape="'circle'"
                :type="'primary'"
                @click="editHandler(record.id as string)"
              >
                <IconPencil />
              </ButtonBase>
              <ButtonBase
                :shape="'circle'"
                :type="'danger'"
                @click="removeHander(record.id as string)"
              >
                <IconTrash />
              </ButtonBase>
            </div>
          </template>
          <template v-else-if="column.type === 'tag'">
            <div class="px-4">
              <span 
                :class="{
                  'bg-blue-600': record[field.id] === 'new',
                  'bg-green-600':record[field.id] === 'proccesing',
                  'bg-purple-600': record[field.id] === 'succsess',
                  'bg-red-600': record[field.id] === 'cancel'
                }"
                class="text-sm  text-white py-1 px-2 rounded shadow-lg whitespace-nowrap"
              >{{ statusLabel(record[field.id] as string) }}</span>
            </div>
          </template>
          <template v-else-if="column.type === 'date'">
            <span class="px-4">{{ dateFormat(record[field.id] as string) }}</span>
          </template>
          <template v-else>
            <span class="px-4">{{ record[field.id] }}</span>
          </template>
        </template>

        <template #loading>
          <table class="w-full">
            <tbody>
              <tr 
                v-for="index in 10"
                :key="index"
                class="border-b"
              >
                <td
                  v-for="(column) in columns"
                  :key="column.id"
                  :style="{ 'width': `${column.width}px` }"
                  class="px-4 py-2"
                >
                  <div class="h-6 w-2/3 bg-gray-200 rounded" />
                </td>
              </tr>
            </tbody>
          </table>
        </template>
        <template #empty>
          <div class=" w-full h-32 flex justify-center items-center">
            <span class=" text-lg text-gray-400">Нет данных</span>
          </div>
        </template>
        <template #footer>
          <div class="w-full flex justify-center px-4 py-6">
            <ButtonBase :type="'primary'">
              Prev
            </ButtonBase>
            <ButtonBase :type="'primary'">
              1
            </ButtonBase>
            <ButtonBase :type="'primary'">
              2
            </ButtonBase>
            <ButtonBase :type="'primary'">
              Next
            </ButtonBase>
          </div>
        </template>
      </TableBase>
    </div>
    <ClientOnly>
      <Teleport to="#space-modal">
        <ModalTaskEdit
          v-model:visibility="modal"
          :mode="'edit'"
          :record="source"
        />
      </Teleport>
    </ClientOnly>
  </div>
</template>
