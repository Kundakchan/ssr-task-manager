export interface TaskParams {
  name: string,
  description: string,
  status: string
}

export interface TaskParamsUpdate extends TaskParams {
  id: string
}

export interface TaskListItemStorage extends Omit<TaskParamsUpdate, 'description'> {
  created: string
  updated: string | null
}



export interface Attributes {
  statuses: {
    value: string
    label: string
  }[]
  statusLabel: Record<string, string>
}

export type FiltersFields = 'sortBy' | 'pageNo' | 'status'

export interface Filters extends Partial<Record<FiltersFields, string>> {}

export interface TaskStorage {
  list: TaskListItemStorage[]
  loading: boolean,
  attributes: Attributes
  filters: Filters
}