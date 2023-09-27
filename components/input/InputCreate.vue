<script lang="ts" setup>
interface Props {
  placeholder: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: ''
})


</script>

<template>
  <div class="flex w-full items-center">
    <InputBase
      :placeholder="props.placeholder"
      class="h-10"
      :shadow="false"
    />
    <ButtonBase
      type="primary"
    >
      Создать
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </template>
    </ButtonBase>
  </div>
</template>