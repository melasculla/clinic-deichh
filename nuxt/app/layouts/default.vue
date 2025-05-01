<script setup lang="ts">

</script>

<template>
   <div class="grid gap-4">
      <header>
         <TheHeader />
      </header>

      <!-- <aside class="col-span-1 pl-4">
         <TheSidebar />
      </aside> -->

      <main class="relative has-[.page-enter-active,.page-leave-active]:overflow-hidden">
         <slot />
      </main>

      <footer>
         <TheFooter />
      </footer>
   </div>
</template>

<style scoped></style>