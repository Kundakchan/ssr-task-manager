<script lang="ts" setup>
interface Items {
  value: string
  label: string
}
interface Props {
  items: Items[]
  modelValue?: string
  id?: string
  disabled?: boolean
  mode?: 'select' | 'model'
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: '',
  disabled: false,
  mode: 'model'
})

interface Emits {
  (e: 'update:modelValue', value: string ): void
  (e: 'select', value: string): void
}
const emit = defineEmits<Emits>()

const dropdownVisibility = ref(false)
const dropdownToggleHandler = () => {
  dropdownVisibility.value = !dropdownVisibility.value
}
const choose = (value: string) => {
  if (props.mode === 'model') {
    emit('update:modelValue', value)
  } else if (props.mode === 'select') {
    emit('select', value)
  }
  dropdownToggleHandler()
}

const selectedLabel = computed(() => props.items.find(item => item.value === props.modelValue)?.label)
</script>

<template>
  <div class="grid gap-1 w-full">
    <label
      v-if="id"
      :for="props.id"
    >
      <slot name="label" />
    </label>
    <DropdownBase
      :visibility="dropdownVisibility"
      overlay-full
      @click-toggler="dropdownToggleHandler"
      @mouse-leave-dropdown="dropdownToggleHandler"
    >
      <button
        :id="props.id"
        :disabled="disabled"
        :class="['button', { 
          'enabled': !disabled,
          'disabled': disabled
        }]"
      >
        <span>{{ selectedLabel }}</span>
        <span
          v-if="!disabled"
          class="transition duration-100 ease-in-out"
          :class="[{ 'rotate-180': dropdownVisibility }]"
        >
          <IconChevronUp />
        </span>
      </button>
      <template #overlay>
        <ul class="shadow-lg bg-gray-100">
          <li
            v-for="(item) in props.items"
            :key="item.value"
          >
            <button
              class="text-left px-4 py-2 w-full outline-none hover:bg-gray-50 focus:bg-gray-50 text-gray-800 active:bg-gray-200"
              @click="choose(item.value)"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
      </template>
    </DropdownBase>
  </div>
</template>


<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .button {
    @apply flex gap-2 items-center justify-between px-4 py-2  w-full text-left outline-none border border-transparent
  }
  .disabled {
    @apply cursor-text select-text
  }
  .enabled {
    @apply shadow-lg bg-gray-100 text-gray-600 hover:bg-gray-50 focus:border-blue-600 active:border-blue-600
  }
}
</style>