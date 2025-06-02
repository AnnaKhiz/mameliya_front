<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import router from "@/app/router";
import { AppInputPassword } from "@/shared/ui/form";
import {
  type FormSigInField,
  type FormFieldsType,
  signInValidationSchema
} from "@/entities/user";
import { useI18n } from 'vue-i18n';
import {ref} from "vue";
import * as yup from "yup";
const { t } = useI18n();
import { useUserStore } from "@/entities/user";
const { signInUser } = useUserStore();

const goToRegister = () => {
  router.push({ name: 'register'});
}

type ErrorsType = {
  [K in FormSigInField]?: string;
}

const message = ref<string>('');
const errors = ref<ErrorsType>({});
const formData = ref<FormFieldsType>({
  email: '',
  password: ''
});

const validation = async () => {
  try {
    await signInValidationSchema.validate(formData.value, { abortEarly: false });
    message.value = t('notify.please_wait');
    return true;
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      message.value = '';
      error.inner.forEach((validationError) => {
        const field = validationError.path;
        if (field && ['email', 'password'].includes(field)) {
          errors.value[field as FormSigInField] = validationError.message;
        }
      });
    } else {
      console.error('Unexpected error', error);
    }
    return false;
  }
}

const submitForm = async () => {
  errors.value = {};
  const isFormValid = await validation();

  if (!isFormValid) return;
  const { email, password } = formData.value;

  const result = await signInUser({
    email,
    password
  });

  if (result && result.code === 400) {
    message.value = t('notify.wrong_email_or_password');
    return;
  }

  localStorage.setItem('userAuthenticated', 'true');
  message.value = t('notify.register_successful');

  setTimeout(async () => {
    await router.push({ name: 'user', params: { id: result?.data?.userId }});
  }, 1500);

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
          v-model="formData.email"
        />
        <span
          v-if="errors.email"
          class="text-red-600 text-2xs ml-2"
        >
          {{ errors.email }}
        </span>
      </div>
      <div >
        <p class="mb-2">{{ t('auth.enter_password') }}</p>
        <AppInputPassword :field="'password'" :form="formData" />
        <span
          v-if="errors.password"
          class="text-red-600 text-2xs ml-2"
        >
          {{ errors.password }}
        </span>
      </div>

      <AppButton :label="t('general.signin')" class="w-full" @click.prevent="submitForm"/>
    </form>
    <p class="text-green-900 text-sm mb-4">{{ message}}</p>

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
