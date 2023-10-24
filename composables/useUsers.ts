import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import type { ProfileUpdate, Role, User, GetUsersQuery } from '~/types/users'

export const userRemove = async (uid: string) => {
  await useFetch(`/api/admin/users/${uid}`, { method: 'DELETE' })
  const { list } = toRefs(useUsersStorage().value)
  list.value = list.value.filter(user => user.uid !== uid)
}
export const usersGet = async (query?: GetUsersQuery) => {
  usersLoadingSet(true)
  const { list } = toRefs(useUsersStorage().value)
  const { data } = await useFetch('/api/admin/users', { query: query })
  list.value = data.value ? data.value : []
  usersLoadingSet(false)
}

export const logInAgain = async (password: string) => {
  const { user } = toRefs(useAuthStorage().value)
  if (!user || !user.value?.email) throw createError('Данные пользователя отсутствуют')

  const credential = EmailAuthProvider.credential(
    user.value.email,
    password
  )

  return reauthenticateWithCredential(user.value, credential)
}

export const profileUpdate = async ({ displayName, email, password, oldPassword }: ProfileUpdate) => {
  const { $notification } = useNuxtApp()
  const UserCredential = await logInAgain(oldPassword)
  const user = UserCredential?.user
  if (!user) throw createError('Данные пользователя отсутствуют')

  if (displayName !== user?.displayName) {
    await updateProfile(user, { displayName })
    $notification.success('Имя пользователя обновлено')
  }

  if (email !== user?.email) {
    await updateEmail(user, email)
    $notification.success('Почта обновлена')
  }

  if (password) {
    await updatePassword(user, password)
    $notification.success('Пароль обновлён')
  }
}

const usersLoadingTime = ref<NodeJS.Timeout | null>(null)
export const usersLoadingSet = (value: boolean, time = 500) => {
  if (process.server) return
  if (usersLoadingTime.value) {
    clearTimeout(usersLoadingTime.value)
  }
  usersLoadingTime.value = setTimeout(() => {
    const { loading } = toRefs(useUsersStorage().value)
    loading.value = value
    usersLoadingTime.value = null
  }, time)
}

export const setUserRole = async (uid: string, role: Role) => {
  await useFetch(`/api/admin/users/${uid}`, { method: 'PATCH', body: { role } })
}

export const updateUser = async (user: User) => {
  await useFetch(`/api/admin/users/${user.uid}`, {
    method: 'PATCH',
    body: {
      displayName: user.displayName,
      email: user.email,
      role: user.role
    }
  })
}