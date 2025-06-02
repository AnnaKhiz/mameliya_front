<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import router from "@/app/router";
import { AppInputPassword } from "@/shared/ui/form";
import * as yup from 'yup';
import { fetchData } from "@/shared/api";
import { useI18n } from 'vue-i18n';
import {ref} from "vue";
const { t } = useI18n();
const goToLogin = () => {
    router.push({ name: 'login'});
}
type FormField = 'email' | 'password' | 'passwordConfirm';

type ErrorsType = {
  [K in FormField]?: string;
}
type FormRegisterType = {
  email: string;
  password: string;
  passwordConfirm?: string;
}
const message = ref<string>('');
const errors = ref<ErrorsType>({});
const formData = ref<FormRegisterType>({
  email: '',
  password: '',
  passwordConfirm: '',
});

const validation = async () => {
  const schema = yup.object({
    email: yup.string().email('Неправильный формат email').required('Email обязателен'),
    password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
    passwordConfirm: yup.string()
      .min(6, 'Минимум 6 символов')
      .required('Подтверждение пароля обязательно')
      .oneOf([yup.ref('password')], 'Пароли не совпадают'),
    })

  try {
    await schema.validate(formData.value, { abortEarly: false });
    message.value = t('messages.please_wait');
  } catch (error: unknown) {
    if (error instanceof yup.ValidationError) {
      message.value = '';
      error.inner.forEach((validationError) => {
        const field = validationError.path;
        if (field && ['email', 'password', 'passwordConfirm'].includes(field)) {
          errors.value[field as FormField] = validationError.message;
        }
      });
    } else {
      console.error('Unexpected error', error);
    }
  }
}

const signUpUser = async (body: FormRegisterType) => {
  let result = null;
  try {
    result = await fetchData('api/user/login', 'POST', {}, body);
    console.log('result', result)
  } catch (error) {
    console.error('Error [Sign up user]: ', error);
  }
  return result;
}

const submitForm = async () => {
  errors.value = {};
  await validation();
  const {email, password, passwordConfirm} = formData.value;

  if (!email || !password || !passwordConfirm) return;

  const result = await signUpUser({
    email,
    password
  });

  if (result.code === 400) {
    message.value = 'Пустые поля';
    return
  } else if (result.code === 409) {
    message.value = 'Пользователь с таким email уже существует';
    return
  }

  console.log('id', result.data.userId)
  message.value = 'Регистрация прошла успешно';
  await router.push({name: 'user', params: {id: result.data.userId}});

}


</script>

<template>
    <div class="shadow-2xl rounded-lg p-5 px-10 min-w-[400px]">
        <h2 class="mb-5 text-center font-semibold text-2xl">
          {{ t('auth.register_title') }}
        </h2>

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
              <p>{{ t('auth.enter_password') }}</p>
              <AppInputPassword :field="'password'" :form="formData"/>
              <span
                v-if="errors.password"
                class="text-red-600 text-2xs ml-2"
              >
                {{ errors.password }}
              </span>
            </div>
            <div>
              <p>{{ t('auth.enter_confirm_password') }}</p>
              <AppInputPassword is-confirm :field="'passwordConfirm'" :form="formData"/>
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
