<script setup lang="ts">

</script>

<template>
   <div class="grid grid-cols-[5fr_4fr] items-stretch min-h-[calc(100vh-40px)]">
      <div class="grid grid-rows-[auto_1fr_auto] gap-3">
         <div class="flex justify-between items-center">
            <NuxtImg class="" src="/img/points.png" />

            <ButtonMain to="/entrypage" class="mr-10" variant="dark">
               Вход
            </ButtonMain>
         </div>

         <div class="grid px-10 content-center gap-5">
            <h2 class="text-7xl leading-10">Онлайн-консультации с психологами</h2>

            <p class="text-4xl text-gray-500 text-balance">Пройдите тестирование и мы подберём психолога специально для
               Вас!</p>

            <ButtonMain class="inline-block justify-self-start" to="/formpage" variant="dark">
               Подобрать психолога
            </ButtonMain>
         </div>

         <div class="flex">
            <NuxtImg class="ml-auto" src="/img/points.png" />
         </div>
      </div>

      <div class="h-full">
         <NuxtImg class="size-full object-cover" src="/img/fon.jpg" />
      </div>
   </div>
</template>

<style scoped></style>