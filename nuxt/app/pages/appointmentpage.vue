<script lang="ts" setup>
 
</script>
<appointmentpage :doctor-id="1" :user-id="1" />
<template>
   <div>
      <div class="max-w-250 mx-auto h-120 bg-background rounded-2xl p-5">
         <div class="grid grid-cols-3 gap-4 h-full">
            <div class="flex flex-col bg-white p-4 col-span-1 rounded-2xl">
               <Img class="h-30 mx-auto mb-4 rounded-full" src="/img/default-profile.jpg" />
               <h1 class="text-2xl font-semibold text-center mb-2">Имя Фамилия</h1>
               <p class="text-center text-[#58A791]">Специализации</p>
               <Button class="mt-auto h-10 w-full rounded-lg text-white bg-[#58A791] hover:shadow-[0_2px_4px_#5E6566]">Подтвердить запись</Button>
            </div>

            <div class="bg-white p-4 col-span-2 rounded-2xl">
               <Calendar :doctor-id="1"
               />
               <Button class="h-10 px-10 m-4 rounded-lg bg-[#DAE9DB] hover:shadow-[0_2px_4px_#5E6566] hover:bg-[#58A791] hover:text-white">Время</Button>
            </div>

         </div>
      </div>

      <NuxtImg class="absolute top-0 left-10" src="/img/points.png" />
      <NuxtImg class="absolute bottom-0 right-10" src="/img/points.png" />
   </div>
</template>

<style scoped></style>