
<script setup lang="ts">

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

   .rotate-enter-active,
   .rotate-leave-active {
   transition: all 0.4s;
   }
   .rotate-enter-from,
   .rotate-leave-to {
   opacity: 0;
   transform: rotate3d(1, 1, 1, 15deg);
   }
</style>