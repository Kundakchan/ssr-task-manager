import { getAuth } from 'firebase-admin/auth'
import type { UserRecord } from 'firebase-admin/auth'

interface DTO {
  displayName: string
  email: string
  password: string
  role: string
}
type IndexHandler = keyof DTO
interface MapHandler extends Record<IndexHandler, (value: string, user: UserRecord) => Promise<void>> { }

const mapHandler: MapHandler = {
  displayName: async (value, user) => {
    await getAuth().updateUser(user.uid, { 'displayName': value })
  },
  email: async (value, user) => {
    await getAuth().updateUser(user.uid, { 'email': value })
  },
  password: async (value, user) => {
    await getAuth().updateUser(user.uid, { 'password': value })
  },
  role: async (value, user) => {
    if (user.customClaims) {
      await getAuth().setCustomUserClaims(user.uid, { ...user.customClaims, role: value })
    } else {
      await getAuth().setCustomUserClaims(user.uid, { role: value })
    }
  }
}


export default defineEventHandler(async (event) => {
  const body = await readBody<DTO>(event)
  const uid = await getRouterParam(event, 'uid')

  if (!uid) throw createError({ status: 400, statusText: 'Отсутствует uid' })

  const user = await getAuth().getUser(uid)

  const array = Object.keys(mapHandler) as [IndexHandler]
  const promiseAll: Promise<void>[] = []
  array.forEach(async (handler) => {
    if (body.hasOwnProperty(handler) && body[handler]) {
      promiseAll.push(mapHandler[handler](body[handler], user))
    }
  })

  await Promise.all(promiseAll)
  return getAuth().getUser(uid)
})

