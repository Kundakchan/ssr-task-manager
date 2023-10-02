import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, getIdToken } from 'firebase/auth'
import type { LogIn, Registration } from '~/types/auth'

export const logIn = async ({ email, password }: LogIn) => {
  const auth = getAuth()
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw error
  }
}
export const registration = async ({ userName, email, password }: Registration) => {
  const auth = getAuth()
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    if (auth?.currentUser) {
      await updateProfile(auth.currentUser, { displayName: userName })
    }
  } catch (error) {
    throw error
  }
}
export const logOut = async () => {
  const auth = getAuth()
  try {
    signOut(auth)
  } catch (error) {
    throw error
  }
}
export const initFirebase = async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    const firebaseUser = useFirebaseUser()
    firebaseUser.value = user
    if (user) {
      const accessToken = await getIdToken(user)
      useCookie(`accessToken`).value = accessToken
    } else {
      useCookie("accessToken", { maxAge: -1 }).value = ""
    }
  })
}
