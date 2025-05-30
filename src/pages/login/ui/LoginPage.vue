<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import router from "@/app/router";
import { AppInputPassword } from "@/shared/ui/form";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const goToRegister = () => {
  router.push({ name: 'register'});
}
</script>

<template>
  <div class=" p-5 px-10 shadow-2xl rounded-lg min-w-[400px]">
    <h2 class="mb-5 text-center font-semibold text-2xl">{{ t('auth.signup_title') }}</h2>
    <form action="" class="flex flex-col gap-4 mb-10">
      <div>
        <p class="mb-2">{{ t('auth.enter_email') }}</p>
        <input
          class="w-full mb-1"
          type="email"
          :placeholder="t('auth.email_placeholder')"
        />
        <p class="text-red-600 text-2xs ml-2"></p>
      </div>
      <div >
        <p class="mb-2">{{ t('auth.enter_password') }}</p>
        <AppInputPassword />
        <p  class="text-red-600 text-2xs ml-2"></p>
      </div>

      <AppButton :label="t('general.signin')" class="w-full" />
    </form>

    <div>
      <p>{{ t('auth.not_registered') }}</p>
       <p>{{ t('auth.click') }}
         "<span
           class="font-semibold text-brown-dark hover:text-brown-medium hover:underline cursor-pointer transition duration-500"
           @click="goToRegister"
         >{{ t('general.register') }}</span>"
       </p>
    </div>
  </div>
</template>
