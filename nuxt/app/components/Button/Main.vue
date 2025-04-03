<script setup lang="ts">
import { type RouteLocationRaw } from '#vue-router'
import { NuxtLink } from '#components'

const { variant = 'fill' } = defineProps<{
   to?: RouteLocationRaw,
   variant?: 'fill' | 'outline'
}>()
</script>

<template>
   <component :is="to ? NuxtLink : 'button'" :to="to" class="uppercase rounded-lg py-1 px-2 font-bold cursor-pointer"
      :class="[
         variant === 'fill'
            ? 'text-red-100'
            : 'relative text-transparent bg-clip-text border-2 border-blue-200'
      ]">
      <slot />
   </component>
</template>

<style scoped></style>