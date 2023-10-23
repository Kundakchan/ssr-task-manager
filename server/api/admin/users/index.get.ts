import { getAuth } from 'firebase-admin/auth'
import type { User, GetUsersQuery } from '~/types/users'

export default defineEventHandler(async (event) => {

  const { search } = getQuery<GetUsersQuery>(event)

  const result = await getAuth().listUsers()

  return result.users
    .filter(user => !search || user.displayName?.includes(search) || user.email?.includes(search))
    .map(user => {
      return <User>{
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: user.customClaims?.role
      }
    })
})