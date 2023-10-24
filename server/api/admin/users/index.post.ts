import { getAuth } from 'firebase-admin/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<DTO[]>(event)
  const users = body.map(async user => {
    const createdUser = await getAuth().createUser({
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      disabled: false
    })
    await getAuth().setCustomUserClaims(createdUser.uid, { role: user.role })
    return createdUser
  })
  return Promise.all(users)
})

import type { Role } from "~/types/users"
interface DTO {
  displayName: string
  email: string
  password: string
  role: Role
}