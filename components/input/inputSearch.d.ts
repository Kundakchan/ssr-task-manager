export interface Props {
  modelValue: string
}

export interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'click'): void
}