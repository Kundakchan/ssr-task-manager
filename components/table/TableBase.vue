<script lang="ts" setup>
import type { TableColumn, TableProps } from './Table'

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
})

const styleCol = (column: TableColumn) => {
  return {
    minWidth: `${column.minWidth || column.width}px`,
    maxWidth: `${column.maxWidth}px`,
    width: `${column.width}px`,
  }
}

</script>

<template>
  <div :class="props.classWrapper">
    <table :class="props.classTable">
      <colgroup>
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
            v-for="(collumn) in props.columns"
            :key="collumn.id"
            :class="props.classHeaderCell"
          >
            {{ collumn.label }}
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
      v-if="!props.dataSource.length"
      name="empty"
    />
    <slot name="footer" />
  </div>
</template>
