export interface Props {
  visibility: boolean
}

export interface Emits {
  (e: 'update:visibility', value: boolean): void
  (e: 'cancel', value: void): void
  (e: 'ok', value: { password: string }): void
}