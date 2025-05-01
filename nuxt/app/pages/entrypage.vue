<script lang="ts" setup>
const { signIn } = useAuth()
</script>

<template>
   <div class="py-20">
      <div
         class="relative grid gap-8 max-w-140 mx-auto bg-background border border-secondary rounded-3xl text-center py-36 px-10">
         <p class="text-6xl mb-5">Вход</p>

         <div class="login text-4xl">
            <input class="text-center min-w-0 w-full py-5 px-4 rounded-lg bg-white" type="text" placeholder="Ваш email" />
         </div>

         <ButtonMain>
            Продолжить
         </ButtonMain>

         <ButtonMain @click="signIn('google')">
            Войти через Google
         </ButtonMain>

         <NuxtImg class="-z-[1] absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2" src="/img/points.png" />
         <NuxtImg class="-z-[1] absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2" src="/img/points.png" />
      </div>
   </div>
</template>

<style scoped></style>