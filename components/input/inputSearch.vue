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
      Поиск
      <template #icon>
        <IconSearch class="mr-2" />
      </template>
    </ButtonBase>
  </div>
</template>