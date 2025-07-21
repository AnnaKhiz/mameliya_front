<script setup lang="ts">
import * as yup from "yup";
import router from "@/app/router";
import { AppButton } from "@/shared/ui/button";
import { AppInputPassword } from "@/shared/ui/form";
import { useUserStore } from "@/entities/user";
import { useI18n } from 'vue-i18n';
import {ref} from "vue";
const { t } = useI18n();

const { signUpUser } = useUserStore();
import {
  type FormFieldsType,
  type FormRegisterField,
  registerValidationSchema
} from "@/entities/user";


type ErrorsType = {
  [K in FormRegisterField]?: string;
}

const message = ref<string>('');
const errors = ref<ErrorsType>({});
const formData = ref<FormFieldsType>({
  email: '',
  password: '',
  passwordConfirm: '',
});

const validation = async () => {
  try {
    await registerValidationSchema.validate(formData.value, { abortEarly: false });
    message.value = t('notify.please_wait');
    return true;
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      message.value = '';
      error.inner.forEach((validationError) => {
        const field = validationError.path;
        if (field && ['email', 'password', 'passwordConfirm'].includes(field)) {
          errors.value[field as FormRegisterField] = validationError.message;
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

  const result = await signUpUser({
    email,
    password
  });

  if (result && result.code === 400) {
    message.value = t('notify.empty_fields');
    return
  } else if (result && result.code === 409) {
    message.value = t('notify.user_with_email_exist');
    return
  }

  localStorage.setItem('userAuthenticated', 'true');

  message.value = t('notify.register_successful');
  setTimeout(async () => {
    await router.push({ name: 'user-home', params: { id: result?.data?.userId }});
  }, 1500);
}
</script>

<template>
  <form action="" class="flex flex-col gap-4 mb-10" novalidate>
    <div>
      <p>{{ t('auth.enter_email') }}</p>
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
    <div>
      <AppInputPassword
        v-model="formData.password"
        :field="'password'"
        :title="t('auth.enter_password')"
        :placeholder-text="t('auth.password_placeholder')"
      />
      <span
        v-if="errors.password"
        class="text-red-600 text-2xs ml-2"
      >
                {{ errors.password }}
              </span>
    </div>
    <div>
      <AppInputPassword
        v-model="formData.passwordConfirm"
        :title="t('auth.enter_confirm_password')"
        :field="'passwordConfirm'"
        :placeholder-text="t('auth.password_confirm_placeholder')"
      />
      <span
        v-if="errors.passwordConfirm"
        class="text-red-600 text-2xs ml-2"
      >
                {{ errors.passwordConfirm }}
              </span>
    </div>
    <AppButton :label="t('general.register')" class="w-full" @click.prevent="submitForm"/>
  </form>
  <p class="text-green-900 text-sm mb-4">{{ message}}</p>
</template>

<style scoped>

</style>
