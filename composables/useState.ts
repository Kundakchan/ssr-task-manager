import type { User } from "firebase/auth"
import type { TaskStorage } from "~/types/tasks"
export const useFirebaseUser = () =>
  useState<User | null>("userFirebase", () => null)

export const useTask = () => useState<TaskStorage>('taskStorage', () => {
  return {
    list: [],
    loading: true,
    filters: {
      sortBy: 'created',
      pageNo: '1',
      status: 'all'
    },
    attributes: {
      statuses: [
        { value: 'new', label: 'Новый' },
        { value: 'processing', label: 'В процессе' },
        { value: 'success', label: 'Выполнин' },
        { value: 'cancel', label: 'Отменён' }
      ]
    }
  }
})