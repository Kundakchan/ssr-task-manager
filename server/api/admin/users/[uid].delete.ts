import { getAuth } from 'firebase-admin/auth'

export default defineEventHandler(async (event) => {
  const uid = getRouterParam(event, 'uid')
  if (!uid) throw createError({ status: 400, statusText: 'Отсутствует uid' })
  return await getAuth().deleteUser(uid)
})