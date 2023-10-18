<script lang="ts" setup>
import type { TableColumn, TableProps, SortingSelect, Emits } from './Table'

const props = withDefaults(defineProps<TableProps>(), {
  loading: true,
  classWrapper: '',
  classTable: '',
  classHeader: '',
  classBody: '',
  classRows: '',
  classCell: '',
  classCol: '',
  classHeaderRows: '',
  classHeaderCell: '',
  classColgroup: ''
})

const emit = defineEmits<Emits>()

const styleCol = (column: TableColumn) => {
  return {
    minWidth: `${column.minWidth || column.width}px`,
    maxWidth: `${column.maxWidth}px`,
    width: `${column.width}px`,
  }
}

const sortingHandler = ({ field, method }: SortingSelect) => {
  emit('sorting-select', { field: field, method: method })
}

</script>

<template>
  <div :class="props.classWrapper">
    <table :class="props.classTable">
      <colgroup :class="props.classColgroup">
        <col
          v-for="(column) in props.columns"
          :key="column.id"
          :style="styleCol(column)"
          :class="props.classCol"
        >
      </colgroup>
      <thead :class="props.classHeader">
        <tr :class="props.classHeaderRows">
          <th
            v-for="(column) in props.columns"
            :key="column.id"
            :class="props.classHeaderCell"
          >
            <div class="w-full flex gap-2 items-center justify-start">
              <span>{{ column.label }}</span>
              <div
                v-if="column.sorting"
                class="flex flex-col shadow-lg"
              >
                <button
                  class="h-4 w-6 border flex justify-center items-center text-gray-800 hover:text-gray-500 active:text-gray-900"
                  @click="sortingHandler({ field: column.id, method: 'asc' })"
                >
                  <IconChevronUp class="w-3 h-3" />
                </button>
                <button
                  class="h-4 w-6 border flex justify-center items-center text-gray-800 hover:text-gray-500 active:text-gray-900"
                  @click="sortingHandler({ field: column.id, method: 'desc' })"
                >
                  <IconChevronUp class="rotate-180 w-3 h-3" />
                </button>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody
        v-if="!props.loading && props.dataSource.length"
        :class="props.classBody"
      >
        <tr
          v-for="(record, index) in props.dataSource"
          :key="index"
          :class="props.classRows"
        >
          <td
            v-for="(column) in columns"
            :key="column.id"
            :class="props.classCell"
          >
            <slot
              :name="column.id"
              :record="record"
              :field="column"
            >
              {{ record[column.id] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <slot
      v-if="props.loading"
      name="loading"
    />
    <slot
      v-if="!props.dataSource.length && !props.loading"
      name="empty"
    />
    <slot name="footer" />
  </div>
</template>
