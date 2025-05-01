<script setup lang="ts">
import { type RouteLocationRaw } from '#vue-router'
import { NuxtLink } from '#components'

const { variant = 'fill' } = defineProps<{
   to?: RouteLocationRaw,
   variant?: 'fill' | 'outline'
}>()
</script>

<template>
   <component :is="to ? NuxtLink : 'button'" :to="to"
      class="text-3xl rounded-lg py-6 px-3 font-bold cursor-pointer hover:shadow-[0_2px_4px_#5E6566]" :class="[
         variant === 'fill'
            ? 'text-white bg-[#58A791]'
            : 'relative text-transparent bg-clip-text border-2 border-blue-200'
      ]">
      <slot />
   </component>
</template>

<style scoped></style>