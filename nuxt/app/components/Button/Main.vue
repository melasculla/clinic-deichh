<script setup lang="ts">
import { type RouteLocationRaw } from '#vue-router'
import { NuxtLink } from '#components'

const { variant = 'light', size = 'small' } = defineProps<{
   to?: RouteLocationRaw,
   variant?: 'light' | 'dark'
   size?: 'small' | 'big'
}>()
</script>

<template>
   <component :is="to ? NuxtLink : 'button'" :to="to"
      class="text-3xl rounded-lg font-bold cursor-pointer hover:shadow-[0_2px_4px_#5E6566] transition-all" :class="[
         variant === 'light'
            ? 'text-white bg-[#58A791]'
            : 'text-gray-800 bg-[#DAE9DB] hover:bg-[#58A791] hover:text-white',
         size === 'small'
            ? 'py-3 px-5'
            : 'py-6 px-3'
      ]">
      <slot />
   </component>
</template>

<style scoped></style>