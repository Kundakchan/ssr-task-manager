<script lang="ts" setup>
import { isEqual } from 'lodash'
import type { TableColumn } from '../table/Table'
import type { User } from '~/types/users'
interface Column extends TableColumn {
  type: 'input' | 'select' | 'action'
}
const columns: Column[] = [
  {
    id: 'displayName',
    label: 'Пользователи',
    width: 180,
    type: 'input'
  },
  {
    id: 'email',
    label: 'Email',
    width: 180,
    type: 'input'
  },
  {
    id: 'password',
    label: 'Пароль',
    width: 180,
    type: 'input'
  },
  {
    id: 'role',
    label: 'Роль',
    minWidth: 120,
    type: 'select'
  },
  {
    id: 'actions',
    label: 'Действия',
    width: 100,
    type: 'action'
  }
]

const source = computed(() => useUsersStorage().value.list)
const loading = computed(() => useUsersStorage().value.loading)
usersGet()

const remove = (uid: string) => {
  userRemove(uid)
}

const roles = computed(() => useUsersStorage().value.attributes.roles)

const editRecord = ref<{ [key: string]: User }>({})
const selectedForEditing = computed(() => editRecord.value)
const setEditingMode = (record: User) => {
  editRecord.value[record.uid] = structuredClone({ ...record })
}
const removeEditingMode = async (record: User) => {
  if (!isEqual({...editRecord.value[record.uid]}, {...record})) {
    await updateUser(record)
  }

  delete editRecord.value[record.uid]
}
</script>

<template>
  <TableBase
    :columns="columns"
    :data-source="source"
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
            v-if="selectedForEditing[record.uid]"
            :shape="'circle'"
            :type="'success'"
            @click="removeEditingMode(record)"
          >
            <IconCheck />
          </ButtonBase>
          <ButtonBase
            v-else
            :shape="'circle'"
            :type="'primary'"
            @click="setEditingMode(record)"
          >
            <IconPencil />
          </ButtonBase>
          <ButtonBase
            :shape="'circle'"
            :type="'danger'"
            @click="remove(record['uid'])"
          >
            <IconTrash />
          </ButtonBase>
        </div>
      </template>
      <template v-else-if="column.type === 'select'">
        <div class=" w-48">
          <InputSelect
            v-model="record[field.id]"
            :items="roles"
            :disabled="!selectedForEditing[record.uid]"
          />
        </div>
      </template>
      <template v-else>
        <InputBase
          v-model="record[field.id]"
          :class="['h-10', { 'input-disabled-user-input': !selectedForEditing[record.uid] }]"
          :disabled="!selectedForEditing[record.uid]"
        />
      </template>
    </template>

    <template #loading>
      <table class="w-full">
        <tbody>
          <tr 
            v-for="index in source.length"
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
</template>

<style>
.input-disabled-user-input:disabled {
  border-color: transparent;
  background: transparent;
  cursor: text;
}
</style>