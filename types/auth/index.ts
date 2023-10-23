import type { User } from "firebase/auth"
import type { Role } from "../users"

export interface LogIn {
  email: string
  password: string
}
export interface Registration extends LogIn {
  userName: string
}

export interface AuthCookie {
  token: string
  uid: string,
  role: Role
}

export interface AuthStorage {
  user: User | null,
  isAdmin: boolean
}