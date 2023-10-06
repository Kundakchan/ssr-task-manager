export interface LogIn {
  email: string
  password: string
}
export interface Registration extends LogIn {
  userName: string
}