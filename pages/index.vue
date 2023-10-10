<script lang="ts" setup>

import type { Filters, FiltersFields } from "~/types/tasks"

definePageMeta({
  middleware: "auth"
})


watchEffect(() => {
  const route = useRoute()
  const fields: FiltersFields[] = ['sortBy', 'status']
  const query: Filters = {}
  fields.forEach(field => {
    if (route.query.hasOwnProperty(field)) {
      query[field] = route.query[field]?.toString()
    }
  })
  taskSetFilters(query)
})

watch(() => useTask().value.filters, (filters) => {
  const route = useRoute()
  if (!route.name) return
  navigateTo({ name: route.name, query: { ...route.query, ...filters } })
})
</script>

<template>
  <section class="px-6 sm:py-6">
    <div class="w-full flex justify-center">
      <h1 class="font-bold text-gray-800 text-3xl sm:text-6xl">
        <span class="text-red-600">Todo</span> manager
      </h1>
    </div>
    <div class="w-full mt-4 sm:mt-6 flex justify-center">
      <InputCreate
        class="max-w-screen-lg"
      />
    </div>
    <div class="w-full mt-4 sm:mt-6">
      <TaskView />
    </div>
  </section>
</template>