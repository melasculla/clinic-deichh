<script lang="ts" setup>

</script>

<template>
   <div>
      <div class="max-w-250 mx-auto h-120 bg-background rounded-2xl p-5">
         <div class="grid grid-cols-3 gap-4 h-full">
            <div class="bg-white p-4 col-span-1 rounded-2xl"></div>

            <div class="bg-white p-4 col-span-2 rounded-2xl">
               <Calendar />
            </div>
         </div>
      </div>

      <NuxtImg class="absolute top-0 left-15" src="/img/points.png" />
      <NuxtImg class="absolute bottom-0 right-15" src="/img/points.png" />
   </div>
</template>

<style scoped></style>