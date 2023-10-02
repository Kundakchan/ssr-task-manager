<script lang="ts" setup>
import type { TableColumn } from '../table/Table'

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
  type: 'text' | 'action' | 'tag'
}

const columns: Column[] = [
  {
    id: 'created',
    label: 'Дата создания',
    width: 180,
    type: 'text'
  },
  {
    id: 'updated',
    label: 'Дата обновления',
    width: 180,
    type: 'text'
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

interface DataSource {
  id: string,
  created: string,
  updated: string,
  name: string,
  status: string
}

let dataSource = ref<DataSource[]>([])

for (let index = 0; index < 5; index++) {
  dataSource.value.push({
    id: index.toString(),
    created: '01.12.1995',
    updated: '01.12.1995',
    name: `Тестовая задача - ${index}`,
    status: 'Новая'
  })
}

const loadingTable = ref(true)


onMounted(() => {
  setTimeout(() => {
    loadingTable.value = false
  }, 300)
})


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
        :data-source="dataSource"
        :loading="loadingTable"
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
              >
                <IconPencil />
              </ButtonBase>
              <ButtonBase
                :shape="'circle'"
                :type="'danger'"
              >
                <IconTrash />
              </ButtonBase>
            </div>
          </template>
          <template v-else-if="column.type === 'tag'">
            <div class="px-4">
              <span class=" text-sm bg-blue-600 text-white py-1 px-2 rounded shadow-lg">{{ record[field.id] }}</span>
            </div>
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
  </div>
</template>
