<script lang="ts" setup>
const dropdownVisibility = ref(false)
const dropdownToggleHandler = () => {
  dropdownVisibility.value = !dropdownVisibility.value
}

const navMenu = [
  {
    label: 'Профиль',
    handler: () => {
      navigateTo({ name: 'profile' })
      dropdownVisibility.value = false
    }
  },
  {
    label: 'Выйти',
    handler: async () => {
      await logOut()
      dropdownVisibility.value = false
      navigateTo({ name: 'auth' })
    }
  }
]

</script>

<template>
  <DropdownBase
    :visibility="dropdownVisibility"
    :placement="'right'"
    @click-toggler="dropdownToggleHandler"
    @mouse-leave-dropdown="dropdownToggleHandler"
  >
    <ButtonBase
      type="primary"
      :shape="'circle'"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </template>
    </ButtonBase>
        
    <template #overlay>
      <div class="bg-white mt-1 rounded shadow-xl">
        <ul>
          <li
            v-for="(item, index) in navMenu"
            :key="index"
          >
            <button
              class="py-2 px-6 w-full text-left focus:outline-none transition-colors text-blue-600 font-medium hover:text-blue-700 hover:bg-blue-100 focus:text-blue-700 focus:bg-blue-100 active:text-blue-500 active:bg-white"
              @click="item.handler"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
      </div>
    </template>
  </DropdownBase>
</template>