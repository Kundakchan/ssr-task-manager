import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  getIdTokenResult,
  getIdToken
} from 'firebase/auth'
import type { LogIn, Registration } from '~/types/auth'

export const logIn = async ({ email, password }: LogIn) => {
  const auth = getAuth()
  await signInWithEmailAndPassword(auth, email, password)
}
export const registration = async ({ userName, email, password }: Registration) => {
  const auth = getAuth()
  await createUserWithEmailAndPassword(auth, email, password)
  if (!auth?.currentUser) throw createError('Данные пользователя отсутствуют')
  await updateProfile(auth.currentUser, { displayName: userName })
  await setUserRole(auth.currentUser.uid, 'user')
}
export const logOut = async () => {
  const auth = getAuth()
  signOut(auth)
}
export const initFirebase = async () => {
  const auth = getAuth()

  const cookieUser = useCookie('cookieUser')
  onAuthStateChanged(auth, async (data) => {
    const { user, isAdmin } = toRefs(useAuthStorage().value)

    if (!data) {
      cookieUser.value = null
      return
    }

    const token = await getIdToken(data)
    const { claims } = await getIdTokenResult(data)

    user.value = data
    isAdmin.value = claims.role === 'admin'

    cookieUser.value = JSON.stringify({ token, uid: data.uid, role: claims.role })

  })
}