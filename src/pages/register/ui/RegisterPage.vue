<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import router from "@/app/router";
import { AppInputPassword } from "@/shared/ui/form";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const goToLogin = () => {
    router.push({ name: 'login'});
}
</script>

<template>
    <div class="shadow-2xl rounded-lg p-5 px-10 min-w-[400px]">
        <h2 class="mb-5 text-center font-semibold text-2xl">
          {{ t('auth.register_title') }}
        </h2>
        <form action="" class="flex flex-col gap-4 mb-10">
            <div>
              <p>{{ t('auth.enter_email') }}</p>
              <input
                class="w-full mb-1"
                type="email"
                :placeholder="t('auth.email_placeholder')"
              />
              <p  class="text-red-600 text-2xs ml-2" > </p>
            </div>
            <div>
              <p>{{ t('auth.enter_password') }}</p>
              <AppInputPassword />
              <p  class="text-red-600 text-2xs ml-2" > </p>
            </div>
            <div>
              <p>{{ t('auth.enter_confirm_password') }}</p>
              <AppInputPassword is-confirm/>
              <p  class="text-red-600 text-2xs ml-2" > </p>
            </div>

            <AppButton :label="t('general.register')" class="w-full" />
        </form>

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
