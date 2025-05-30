<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import router from "@/app/router";
import { ref } from "vue";
import { AppInputPassword } from "@/shared/ui/form";

const goToRegister = () => {
  router.push({ name: 'register'});
}
</script>

<template>
  <div class=" p-5 px-10 shadow-2xl rounded-lg min-w-[400px]">
    <h2 class="mb-5 text-center font-semibold text-2xl">Войти в личный кабинет:</h2>
    <form action="" class="flex flex-col gap-4 mb-10">
      <div>
        <p class="mb-2">Введите email:</p>
        <input class="w-full mb-1" type="email" />
        <p class="text-red-600 text-2xs ml-2"></p>
      </div>
      <div >
        <p class="mb-2">Введите пароль:</p>
        <AppInputPassword />
        <p  class="text-red-600 text-2xs ml-2"></p>
      </div>

      <AppButton label="Войти" class="w-full" />
    </form>

    <div>
      <p>Еще не зарегистрированы?</p>
       <p>Нажмите
         "<span
           class="font-semibold text-brown-dark hover:text-brown-medium hover:underline cursor-pointer transition duration-500"
           @click="goToRegister"
         >Регистрация</span>"
       </p>
    </div>
  </div>

</template>

<style scoped lang="scss">

</style>
