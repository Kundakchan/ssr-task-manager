import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
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
}
export const logOut = async () => {
  const auth = getAuth()
  signOut(auth)
}
export const initFirebase = async () => {
  const auth = getAuth()

  const cookieUser = useCookie('cookieUser')
  onAuthStateChanged(auth, async (user) => {
    cookieUser.value = user ? JSON.stringify(user) : null
    const firebaseUser = useFirebaseUser()
    firebaseUser.value = user
  })
}
