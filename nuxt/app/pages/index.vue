<script setup lang="ts">

</script>

<template>
   <div>
      <div class="content">
         <NuxtLink to="/entrypage">
            <div class="entry_but">
               <p>Вход</p>
            </div>
         </NuxtLink>

         <div class="site_title">
            <p>Онлайн-консультации с психологами</p>
         </div>

         <div class="s_title">
            <p>Пройдите тестирование и мы подберём психолога специально для Вас!</p>
         </div>

         <NuxtLink to="/formpage">
            <div class="form_but">
               <p>Подобрать психолога</p>
            </div>
         </NuxtLink>
      </div>

      <NuxtImg class="points_left_img" src="/img/points.png" />
      <NuxtImg class="points_right_img" src="/img/points.png" />
      <NuxtImg class="fon_img" src="/img/fon.jpg" />
   </div>
</template>

<style scoped>
.content {
   position: absolute;
   font-family: 'Lettersano Regular', sans-serif;
   right: 45%;
}

.content .site_name {
   position: absolute;
   z-index: 3;
   left: 5rem;
   top: 1rem;
}

.content .site_name p {
   font-size: calc(25px + 2vw);
}

.content .entry_but {
   width: calc(7rem + 2vw);
   height: calc(3rem + 1vw);

   padding: .8rem 2rem;
   background: #DAE9DB;
   text-align: center;
   border-radius: 50px;
   position: absolute;
   top: 2rem;
   right: 2rem;
   margin-bottom: 0;
   z-index: 3;
}

.content .entry_but:hover {
   background: #58A791;
}

.content .entry_but p {
   font-size: 25px;
}

.points_right_img {
   position: fixed;
   bottom: 0;
   right: 45%;
   width: 10%;
   z-index: 2;
}

.points_left_img {
   position: fixed;
   top: 0;
   left: 0;
   width: 10%;
   z-index: 2;
}

.fon_img {
   position: fixed;
   top: 0;
   right: 0;
   width: 45%;
   height: 100%;
   object-fit: cover;
   z-index: 1;
}

.content .site_title {
   margin-top: 30%;
   margin-left: 4rem;
   margin-right: 1rem;
   line-height: 3em;
   z-index: 3;
}

.content .site_title p {
   font-size: calc(40px + 2vw);
}

.content .s_title {
   margin-top: 15px;
   margin-left: 4.5rem;
   margin-right: 8rem;
   line-height: 2.5em;
   z-index: 3;
}

.content .s_title p {
   font-size: calc(2px + 2vw);
   color: #5E6566;
}

.content .form_but {
   width: calc(15rem + 2vw);
   height: calc(5rem + 1vw);

   padding: 1rem 2rem;
   background: #DAE9DB;
   text-align: center;
   border-radius: 30px;
   margin-top: 2rem;
   margin-left: 4.5rem;
   margin-bottom: 0;
}

.content .form_but:hover {
   background: #58A791;
}

.content .form_but p {
   font-size: calc(15px + 1vw);
   line-height: 1em;
}
</style>