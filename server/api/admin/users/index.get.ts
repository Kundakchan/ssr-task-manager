import { getAuth } from 'firebase-admin/auth'
import type { User } from '~/types/users'

export default defineEventHandler(async () => {

  const result = await getAuth().listUsers()

  return result.users.map(user => {
    return <User>{
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: user.customClaims?.role
    }
  })
})