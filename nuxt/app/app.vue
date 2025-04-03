<script setup lang="ts">
import PrimeConfirmDialog from 'primevue/confirmdialog'

useHead({
   htmlAttrs: {
      class: ['dark']
   }
})
</script>

<template>
   <div>
      <!-- <NuxtRouteAnnouncer /> -->
      <NuxtLayout>
         <NuxtPage />
         <PrimeConfirmDialog />
      </NuxtLayout>
   </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
   transition: all 250ms ease;
}

.page-leave-active {
   position: absolute;
   left: 0;
   width: 100%;
   height: auto;
}

.page-enter-from,
.page-leave-to {
   filter: blur(10px);
   opacity: 0;
}
</style>