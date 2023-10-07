import { getFirestore, addDoc, collection, query, getDocs, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore"
import dayjs from 'dayjs'

import type { TaskParams, TaskParamsUpdate, TaskListItemStorage, Filters } from "~/types/tasks"
import type { FirebaseApp } from "firebase/app"
import type { DocumentData } from "firebase/firestore"

export const taskGet= async (id: string) : Promise<DocumentData | null> => {
  const firebase = useNuxtApp().$firebase as FirebaseApp
  const db = getFirestore(firebase)
  try {
    const docRef = doc(db, "tasks", id)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id} : null
  } catch (error) {
    throw error
  }
}
export const tasksGet = async () => {
  const { list } = toRefs(useTask().value)
  taskLoadingSet(true)

  const firebase = useNuxtApp().$firebase as FirebaseApp
  const db = getFirestore(firebase)

  try {
    const q = query(collection(db, 'tasks'))
    const docs = await getDocs(q)
    list.value = []
    docs.forEach((doc) => {
      const data = doc.data()
      list.value.push({
        id: doc.id,
        updated: data.updated,
        created: data.created,
        name: data.name,
        status: data.status
      })
    })
  } catch (error) {
    throw error
  } finally {
    taskLoadingSet(false)
  }
}
export const taskCreating = async ({ name, description, status }: TaskParams) => {
  const firebase = useNuxtApp().$firebase as FirebaseApp
  const db = getFirestore(firebase)
  const { list } = toRefs(useTask().value)

  try {
    const data = {
      name: name,
      status: status,
      description: description,
      created: dayjs().format(),
      updated: null,
    }
    const result = await addDoc(collection(db, "tasks"), data)
    list.value.push({ ...data, id: result.id, created: data.created })
  } catch (error) {
    throw error
  }
}
export const taskUpdate = async ({ id, name, description, status }: TaskParamsUpdate) => {
  const firebase = useNuxtApp().$firebase as FirebaseApp
  const db = getFirestore(firebase)
  const { list } = toRefs(useTask().value)

  const data = {
    name,
    status,
    description,
    updated: dayjs().format()
  }

  try {
    const docRef = doc(db, "tasks", id)
    await updateDoc(docRef, data)
    const docSnap = await getDoc(docRef)
    
    const docData = docSnap.data()

    if (docData) {
      delete docData.description
      const index = list.value.findIndex(record => record.id === id)
      list.value.splice(index, 1, { ...docData, id: id } as TaskListItemStorage)
    }
  } catch (error) {
    throw error
  }
}
export const taskRemove = async (id: string) => {
  const { list } = toRefs(useTask().value)
  const firebase = useNuxtApp().$firebase as FirebaseApp
  const db = getFirestore(firebase)

  try {
    await deleteDoc(doc(db, 'tasks', id))
    list.value = list.value.filter(record => record.id !== id)
  } catch (error) {
    throw error
  }
}
export const taskLoadingSet = (value: boolean) => {
  const { loading } = toRefs(useTask().value)
  loading.value = value
}

export const taskSetFilters = (filtersParams: Filters) => {
  const { filters } = toRefs(useTask().value)
  filters.value = { ...filters.value, ...filtersParams }
}