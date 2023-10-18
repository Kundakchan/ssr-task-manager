export interface TableColumn {
  id: string,
  label: string
  minWidth?: number
  maxWidth?: number
  width?: number
  sorting?: boolean
}

export interface SourceItem {
  [key: string]: SourceItem | SourceItem[] | string | number | null
}

export interface TableProps {
  columns: Column[]
  dataSource: DataSourceItem[]
  loading?: boolean
  classWrapper?: string
  classTable?: string
  classHeader?: string
  classHeaderRows?: string
  classHeaderCell?: string
  classBody?: string
  classRows?: string
  classCell?: string
  classCol?: string
  classColgroup?: string
}

export interface SortingSelect {
  field: string,
  method: 'asc' | 'desc'
}

export interface Emits {
  (e: 'sorting-select', value: SortingSelect): void
}