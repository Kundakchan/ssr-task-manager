import type { TaskStatus } from "~/types/tasks" 

export interface Source {
  id?: string,
  name?: string,
  description?: string,
  status: TaskStatus
}

export interface Props {
  mode?: 'edit' | 'created'
  visibility: boolean
  source: Source
}

export interface Emits {
  (e: 'update:visibility', value: boolean): void
  (e: 'close', value: void): void
}