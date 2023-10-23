import type { TaskStorage } from "~/types/tasks"
import type { UsersStorage } from "~/types/users"
import type { AuthStorage } from '~/types/auth'

export const useAuthStorage = () => useState<AuthStorage>('authStorage', () => {
  return {
    user: null,
    isAdmin: false
  }
})

export const useTask = () => useState<TaskStorage>('taskStorage', () => {
  return {
    list: [],
    loading: true,
    filters: {
      sortBy: 'created:asc',
      status: 'all'
    },
    attributes: {
      statuses: [
        { value: 'new', label: 'Новый' },
        { value: 'processing', label: 'В процессе' },
        { value: 'success', label: 'Выполнена' },
        { value: 'cancel', label: 'Отменён' }
      ]
    }
  }
})

export const useUsersStorage = () => useState<UsersStorage>('usersStorage', () => {
  return {
    list: [],
    loading: false,
    attributes: {
      roles: [
        { value: 'user', label: 'Пользователь' },
        { value: 'admin', label: 'Администратор' }
      ]
    }
  }
})