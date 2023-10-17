import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import type { ProfileUpdate } from '~/types/users'

import { useToast } from "vue-toastification"
const { success } = useToast()


export const userGet = async () => {

}
export const userSet = async () => {

}
export const userRemove = async () => {

}
export const usersGet = async () => {

}

export const logInAgain = async (password: string) => {
  const user = useFirebaseUser().value
  if (!user?.email) throw createError('Данные пользователя отсутствуют')

  const credential = EmailAuthProvider.credential(
    user.email,
    password
  )

  return reauthenticateWithCredential(user, credential)
}

export const profileUpdate = async ({ displayName, email, password, oldPassword }: ProfileUpdate) => {
  const UserCredential = await logInAgain(oldPassword)
  const user = UserCredential?.user
  if (!user) throw createError('Данные пользователя отсутствуют')

  if (displayName !== user?.displayName) {
    await updateProfile(user, { displayName })
    success('Имя пользователя обновлено')
  }

  if (email !== user?.email) {
    await updateEmail(user, email)
    success('Почта обновлена')
  }

  if (password) {
    await updatePassword(user, password)
    success('Пароль обновлён')
  }
}