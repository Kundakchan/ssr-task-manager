<script lang="ts" setup>
import { taskRemove } from '~/composables/useTasks'
import type { TableColumn, SortingSelect } from '../table/Table'
import type { TaskStatus } from '~/types/tasks'
import type { Source } from '../modal/ModalTaskEdit'

import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
dayjs.locale(ru)

const route = useRoute()

const tabs = computed(() => [ { value: 'all', label: 'Все' }, ...useTask().value.attributes.statuses])

const tabsHandler = async (key: string) => {
  if (!route.name) return
  await navigateTo({ name: route.name, query: { ...route.query, status: key } })
  await tasksGet()
}
const tabsActiveIndex = computed(() => useTask().value.filters.status)

interface Column extends TableColumn {
  type: 'text' | 'action' | 'tag' | 'date'
}

const columns: Column[] = [
  {
    id: 'created',
    label: 'Дата создания',
    width: 180,
    type: 'date',
    sorting: true
  },
  {
    id: 'updated',
    label: 'Дата обновления',
    width: 203,
    type: 'date',
    sorting: true
  },
  {
    id: 'name',
    label: 'Названия',
    minWidth: 200,
    type: 'text',
    sorting: true
  },
  {
    id: 'status',
    label: 'Статус',
    width: 100,
    type: 'tag',
    sorting: true
  },
  {
    id: 'actions',
    label: 'Действия',
    width: 100,
    type: 'action'
  }
]

const { list, loading, attributes } = toRefs(useTask().value)

const removeHandler = (id: string) => {
  taskRemove(id)
}

const getStatusLabel = (status: TaskStatus) => {
  return attributes.value.statuses.find(item => item.value === status)?.label
}

const dateFormat = (date: string) => {
  if (!date) return 'Нет данных'
  return dayjs(date).format('D MMMM YYYY')
}

onMounted(async () => {
  await tasksGet()
})

const skeletonRows = computed(() => list.value.length || 10)

const modal = ref(false)
const source = ref<Source>({
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

const sortingHandler = async ({ field, method }: SortingSelect) => {
  if (!route.name) return
  await navigateTo({ name: route.name, query: { ...route.query, sortBy: [field, method].join(':') } })
  await tasksGet()
}
const { isDesktop } = useDevice()
</script>

<template>
  <div class="md:shadow-lg">
    <div class="md:px-4 pt-2">
      <TabsBase
        v-if="isDesktop"
        :tabs="tabs"
        :active="tabsActiveIndex"
        @click="tabsHandler"
      />
      <InputSelect
        v-else
        v-model="tabsActiveIndex"
        :mode="'select'"
        :items="tabs"
        @select="tabsHandler"
      />
    </div>
    <div class="mt-2"> 
      <TableBase
        class=""
        :columns="columns"
        :data-source="list"
        :loading="loading"
        :class-table="'w-full'"
        :class-header="'hidden md:table-header-group'"
        :class-header-cell="'text-left bg-gray-100 p-4 border-r last:border-r-0'"
        :class-rows="'md:border-b md:table-row md:shadow-none md:rounded-none md:py-0 py-6 grid gap-2 border rounded-lg shadow-lg'"
        :class-colgroup="'md:table-column-group hidden'"
        :class-body="'md:table-row-group grid sm:grid-cols-2 gap-4'"
        :class-cell="'md:table-cell grid'"
        @sorting-select="sortingHandler"
      >
        <template
          v-for="(column) in columns"
          #[column.id]="{ record, field }"
          :key="`span-${column.id}`"
        >
          <template v-if="column.type === 'action'">
            <div class="py-1 px-4 flex gap-2 justify-end">
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
                @click="removeHandler(record.id as string)"
              >
                <IconTrash />
              </ButtonBase>
            </div>
          </template>
          <template v-else-if="column.type === 'tag'">
            <span class="md:hidden px-4 text-gray-400 text-sm">{{ column.label }}</span>
            <div class="px-4">
              <span 
                :class="{
                  'bg-blue-600': record[field.id] === 'new',
                  'bg-green-600':record[field.id] === 'processing',
                  'bg-purple-600': record[field.id] === 'success',
                  'bg-red-600': record[field.id] === 'cancel'
                }"
                class="text-sm  text-white py-1 px-2 rounded shadow-lg whitespace-nowrap"
              >{{ getStatusLabel(record[field.id]) }}</span>
            </div>
          </template>
          <template v-else-if="column.type === 'date'">
            <span class="md:hidden px-4 text-gray-400 text-sm">{{ column.label }}</span>
            <span class="px-4">{{ dateFormat(record[field.id] as string) }}</span>
          </template>
          <template v-else>
            <span class="md:hidden px-4 text-gray-400 text-sm">{{ column.label }}</span>
            <span class="px-4">{{ record[field.id] }}</span>
          </template>
        </template>

        <template #loading>
          <table class="w-full">
            <tbody>
              <tr 
                v-for="index in skeletonRows"
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
      </TableBase>
    </div>
    <ClientOnly>
      <Teleport to="#space-modal">
        <ModalTaskEdit
          v-model:visibility="modal"
          :mode="'edit'"
          :source="source"
        />
      </Teleport>
    </ClientOnly>
  </div>
</template>
