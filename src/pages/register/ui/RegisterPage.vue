<script setup lang="ts">
import router from "@/app/router";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { RegisterForm } from "@/pages/register";
const goToLogin = () => {
  router.push({ name: 'login'});
}

</script>

<template>
  <div class="shadow-2xl rounded-lg p-5 px-10 min-w-[400px]">
    <h2 class="mb-5 text-center font-semibold text-2xl">
      {{ t('auth.register_title') }}
    </h2>
    <RegisterForm />
    <div>
      <p>{{ t('auth.already_registered') }}</p>
      <p>{{ t('auth.click') }}
        "<span
            class="font-semibold text-brown-dark hover:text-brown-medium hover:underline cursor-pointer transition duration-500"
            @click="goToLogin"
        >{{ t('general.signin') }}</span>"
      </p>
    </div>
  </div>
</template>
