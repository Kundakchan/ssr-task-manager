export interface ProfileUpdate {
  displayName: string
  email: string
  password: string
  oldPassword: string
}

export type Role = 'admin' | 'user'

export interface User {
  uid: string
  displayName: string
  email: string
  role: Role
}

interface AttributeRole {
  value: Role
  label: string
}
export interface GetUsersQuery {
  search: string
}

export interface UsersStorage {
  list: User[]
  loading: boolean,
  attributes: {
    roles: AttributeRole[]
  }
}