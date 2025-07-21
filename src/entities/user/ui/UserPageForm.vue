<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import {AppInputPassword, AppInputText} from "@/shared/ui/form";
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
const { user } = storeToRefs(useUserStore());
const { updateUser, checkUserPassword } = useUserStore();
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { type FormUserPageType, userInfoValidationSchema } from "@/entities/user";
import {AppButton} from "@/shared/ui/button";
import ModalComponent from "@/shared/ui/modal";
import type {DialogEventsType} from "@/entities/calendar";

const dialog = ref<DialogEventsType>('none');
const isPasswordChange = ref<boolean>(false);
const messageNotify = ref<string>('');
const messageError = ref<string>('');
const errors = ref<{ [key: string]: string }>();
const formUserPage = ref<FormUserPageType & { passwordCheck?: string }>({
  email: '',
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

const openConfirmPasswordChange = () => {
  dialog.value = 'notify';
  isPasswordChange.value = true;
}

const closeConfirm = (value: DialogEventsType) => {
  dialog.value = value;
  isPasswordChange.value = false;
  formUserPage.value = {
    ...formUserPage.value,
    password: '',
    passwordCheck: ''
  }
}

const confirmPasswordChange = async () => {
  console.log('new password', formUserPage.value)

  const { password, passwordCheck } = formUserPage.value;

  if (!password || !passwordCheck) {
    messageError.value = t('notify.empty_fields');
    return;
  }
  messageError.value = '';
  const result = await checkUserPassword({ password: passwordCheck })

  if (!result?.result) {
    messageError.value = 'Wrong password';
    return
  }
  messageError.value = '';
  dialog.value = 'none';
  return true;
}

const submitForm = async () => {
  const isValid = await validateForm();
  if (isValid) {
    if (isPasswordChange.value) {
      const isPasswordCorrect = await confirmPasswordChange();
      if (!isPasswordCorrect) return;
    }

    formUserPage.value.passwordCheck = '';

    let updatedUser: Partial<FormUserPageType> = {};
    (Object.entries(formUserPage.value) as [keyof FormUserPageType, any][]).forEach(([key, value]) => {
      if (value) {
        updatedUser[key] = value;
      }
    });

    console.log('form for server', updatedUser)
    await updateUser(updatedUser)
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
      <div class="mb-4">
        <p>{{ t('user_page.password') }}</p>
        <AppInputPassword
          v-model="formUserPage.password"
          :placeholder-text="t('user_page.enter_password')"
          :field="'password'"
          :styles="'dark-mode'"
          @input-click="openConfirmPasswordChange"
        />
      </div>
      <code>{{ formUserPage}}</code>
      <div class="flex justify-between items-center gap-4 mt-auto mb-5">
        <AppButton :label="t('general.cancel')"  @click.prevent="emits('update:edit', false)"/>
        <AppButton :label="t('general.send')" @click.prevent="submitForm" />
      </div>

    </form>

  </div>

  <!-- dialog notify  -->
  <ModalComponent
    :show="dialog === 'notify'"
    full
    :title="t('user_page.confirm_password_change')"
    @update:dialog-visibility="dialog = $event"
  >
    <template #default>
      <p>{{ messageNotify }}</p>
    </template>
    <template #actions>
      <div class="flex flex-col gap-4">
        <div class="mb-5">
          <div class="mb-4">
            <p>{{ t('user_page.enter_current_password') }}</p>
            <AppInputPassword
              v-model="formUserPage.passwordCheck"
              :placeholder-text="t('user_page.enter_current_password')"
              :field="'password'"
              :styles="'dark-mode'"
            />
          </div>
          <div>
            <p>{{ t('user_page.enter_new_password') }}</p>
            <AppInputPassword
              v-model="formUserPage.password"
              :placeholder-text="t('user_page.enter_new_password')"
              :field="'passwordConfirm'"
              :styles="'dark-mode'"/>
          </div>
          <p class="text-sm text-red-600">{{ messageError }}</p>
        </div>
        <div class="flex items-center justify-center gap-4">
          <AppButton :label="t('general.confirm')" @click="confirmPasswordChange" />
          <AppButton :label="t('general.close')" @click="closeConfirm" />
        </div>
      </div>

    </template>
  </ModalComponent>
</template>

<style scoped>

</style>
