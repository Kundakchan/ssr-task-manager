<script lang="ts" setup>
import { IconHome, IconInfo, IconUsers } from '@/components/icon'

const nav = [
  {
    key: 'index',
    icon: IconHome,
    handler: () => {
      navigateTo({ name: 'index' })
    }
  },
  {
    key: 'about',
    icon: IconInfo,
    handler: () => {
      navigateTo({ name: 'about' })
    }
  },
  {
    key: 'users',
    icon: IconUsers,
    handler: () => {
      navigateTo({ name: 'users' })
    }
  }
]

</script>

<template>
  <header class="flex w-full items-center px-6 gap-2">
    <nav class="w-full flex justify-center">
      <ul class="flex gap-2">
        <li
          v-for="(item) in nav"
          :key="item.key"
        >
          <ButtonBase
            type="primary"
            :shape="'circle'"
            @click="item.handler"
          >
            <template #icon>
              <component :is="item.icon" />
            </template>
          </ButtonBase>
        </li>
      </ul>
    </nav>
    <div class="w-auto">
      <HeaderUserManu />
    </div>
  </header>
</template>