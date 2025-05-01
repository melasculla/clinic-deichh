<script lang="ts" setup>
</script>

<head>
   
</head>
<template>
  
  <div class="site_name">
    <p>Точка опоры</p>
  </div>

  <div class="entry">
    <p class="vhod">Вход</p>
    <div class="login">
      <input id="emailsignup" name="emailsignup" type="text" placeholder="Ваш email"/>
    </div>
    <button class="next_but">
      <p>Продолжить</p>
    </button>
    <button class="google">
      <a href="/api/auth/signin/" class="google-login-button">
        Войти через Google
      </a>
    </button>

  </div>
  <NuxtImg class="points_left_img" src="/images/points.png" />
  <NuxtImg class="points_right_img" src="/images/points.png" />

</template>


<style>
    @font-face {
    font-family: 'Lettersano Regular';
    font-style: normal;
    font-weight: normal;
    src: local('Lettersano Regular'), url('fixedlettersano.woff') format('woff');
    }


.site_name{
  
  top: 1rem;  
}
.site_name p{
  font-family: 'Lettersano Regular', sans-serif;
  font-size: calc(2px + 2vw);
  text-align: center
}

.entry {
  font-family: 'Lettersano Regular', sans-serif;
  background-color: #DAE9DB;
  border-radius: 20px;
  position: absolute; 
  z-index: 2;
  top: 50vh; 
  left: 50%; 
  transform: translate(-50%, -50%);

  padding-top: 2vh;
  padding-left: 25px;
  padding-right: 25px;

  width: 25%;
  height: 60vh;

  border-width: 2px;
  border-color: #5E6566;
}

.points_left_img {
  position: fixed;
  top:15vh;
  left: 34%;
  width: 8%;
  z-index: 1;
}
.points_right_img {
  position: fixed;
  bottom:11vh;
  right: 34%;
  width: 8%;
  z-index: 1;
}

.entry .vhod{
  font-size: calc(10px + 2vw);
  text-align: center
}

.entry .login {
  margin-top: 5vh;
}

input {
  background-color: #fff;
  border-radius: 10px;
  height: 8vh;
  width: 100%;
  
}
input::placeholder{
  font-size: calc(5px + 1vw);
  text-align: center;
}

.entry .next_but{
  background-color: #58A791;
  border-radius: 10px;
  height: 8vh;
  width: 100%;
  margin-top: 30px;
}
.entry .next_but:hover{
  box-shadow: 0 2px 4px #5E6566;
}
.entry .next_but p{
  font-size: calc(8px + 1vw);
  text-align: center;
  color: #fff;
}

.entry .google{
  background-color: #58A791;
  border-radius: 10px;
  height: 8vh;
  width: 100%;
  margin-top: 10px;
}
.entry .google:hover{
  box-shadow: 0 2px 4px #5E6566;
}
.entry .google a{
  font-size: calc(8px + 1vw);
  text-align: center;
  color: #fff;
}

</style>