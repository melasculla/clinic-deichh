<script setup lang="ts">
import PrimeConfirmDialog from 'primevue/confirmdialog'
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

.page-enter-active,
.page-leave-active {
   transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
   opacity: 0;
}
</style>