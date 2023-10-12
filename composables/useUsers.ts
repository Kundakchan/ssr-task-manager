import {
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
 } from 'firebase/auth'
import type { ProfileUpdate } from '~/types/users'


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
  if (!user?.email) return

  const credential = EmailAuthProvider.credential(
    user.email,
    password
  )

  return reauthenticateWithCredential(user, credential)
}

export const profileUpdate = async ({ displayName, email, password, oldPassword }: ProfileUpdate) => {

  try {
    const UserCredential = await logInAgain(oldPassword)
    const user = UserCredential?.user
    if (!user) return

    if (displayName !== user?.displayName) {
      await updateProfile(user, { displayName })
      console.log('Имя пользователя обновлено')
    }

    if (email !== user?.email) {
      await updateEmail(user, email)
      console.log('Почта обновлена')
    }
  
    if (password) {
      await updatePassword(user, password)
      console.log('Пароль обновлён')
    }

  } catch (error) {
    console.error(error)
  }
}