<script setup lang="ts">
import {AppButton} from "@/shared/ui/button";
import router from "@/app/router";

const goToLogin = () => {
    router.push({ name: 'login'});
}
</script>

<template>
    <div class="shadow-2xl rounded-lg p-5 px-10 min-w-[400px]">
        <h2 class="mb-5 text-center font-semibold text-2xl">Регистрация:</h2>
        <form action="" class="flex flex-col gap-4 mb-10">
            <div>
              <p>Введите email:</p>
              <input class="w-full mb-1" type="email" />
              <p  class="text-red-600 text-2xs ml-2" > </p>
            </div>
            <div>
              <p>Введите пароль:</p>
              <input class="w-full mb-1" type="password" />
              <p  class="text-red-600 text-2xs ml-2" > </p>
            </div>
            <div>
              <p>Введите подтверждение пароля:</p>
              <input class="w-full mb-1" type="password" />
              <p  class="text-red-600 text-2xs ml-2" > </p>
            </div>

            <AppButton label="Регистрация" class="w-full" />
        </form>

        <div>
            <p>Уже зарегистрированы?</p>
            <p>Нажмите
                "<span
                    class="font-semibold text-brown-dark hover:text-brown-medium hover:underline cursor-pointer transition duration-500"
                    @click="goToLogin"
                >Войти</span>"
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>
