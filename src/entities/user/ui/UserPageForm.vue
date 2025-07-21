<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import { AppInputText } from "@/shared/ui/form";
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
const { user } = storeToRefs(useUserStore());
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { type FormUserPageType, userInfoValidationSchema } from "@/entities/user";
import {AppButton} from "@/shared/ui/button";

const errors = ref<{ [key: string]: string }>();
const formUserPage = ref<FormUserPageType>({
  email: '',
  password: '',
})
const emits = defineEmits(['update:edit']);


const validateForm = async () => {
  try {
    errors.value = {};
    await userInfoValidationSchema.validate(formUserPage.value, { abortEarly: false });
    return true;
  } catch (error: any) {
    let validationErrors: { [key: string]: string } = {};
    error.inner.forEach((err: any) => {
      if (err.path) validationErrors[err.path] = err.message;
    })
    errors.value = validationErrors;
    validationErrors = {}

    return false;
  }
}

const submitForm = async () => {
  const isValid = await validateForm();
  if (isValid) {
    console.log('Отправка формы', formUserPage.value)
  } else {
    console.log('Ошибки:', errors.value)
  }
}

onMounted(() => {
  if (user.value) {
    const { first_name, last_name, age, email } = user.value;
    formUserPage.value = {
      ...formUserPage.value,
      first_name,
      last_name,
      age,
      email
    }
  }
})
</script>

<template>
  <div class="w-full h-full">
    <form action="" class="px-3 flex flex-col gap-4 h-full">
      <AppInputText
        v-model="formUserPage.first_name"
        :title="t('user_page.user_name')"
        :placeholder="t('user_page.enter_user_name')"
        :styles="'dark-mode'"
      />
      <AppInputText
        v-model="formUserPage.last_name"
        :title="t('user_page.user_lastname')"
        :placeholder="t('user_page.enter_user_lastname')"
        :styles="'dark-mode'"
      />
      <AppInputText
        v-model.number="formUserPage.age"
        :title="t('user_page.user_age')"
        :placeholder="t('user_page.enter_age')"
        :styles="'dark-mode'"
      />
      <AppInputText
        v-model="formUserPage.email"
        :title="t('user_page.user_email')"
        :placeholder="t('user_page.enter_email')"
        :styles="'dark-mode'"
        :error="errors && errors.email"
      />
      <AppInputText
        v-model="formUserPage.password"
        :title="t('user_page.password')"
        :placeholder="t('user_page.enter_password')"
        :styles="'dark-mode'"
        :error="errors && errors.password"
      />
      <div class="flex justify-between items-center gap-4 mt-auto mb-5">
        <AppButton :label="t('general.cancel')"  @click.prevent="emits('update:edit', false)"/>
        <AppButton :label="t('general.send')" @click.prevent="submitForm" />
      </div>

    </form>

  </div>
</template>

<style scoped>

</style>
