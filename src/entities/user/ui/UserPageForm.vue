<script setup lang="ts">
import { onMounted, ref} from 'vue';
import {AppInputPassword, AppInputText, AppInputNumber} from "@/shared/ui/form";
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
const { user, isLoading } = storeToRefs(useUserStore());
const { updateUser, checkUserPassword } = useUserStore();
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { type FormUserPageType, userInfoValidationSchema } from "@/entities/user";
import {AppButton} from "@/shared/ui/button";
import ModalComponent from "@/shared/ui/modal";
import type {DialogEventsType} from "@/entities/calendar";
import LoaderComponent from "@/features/loader";

const dialog = ref<DialogEventsType>('none');
const isPasswordChange = ref<boolean>(false);
const messageNotify = ref<string>('');
const messageError = ref<string>('');
const errors = ref<{ [key: string]: string }>();
const formUserPage = ref<FormUserPageType & { passwordCheck?: string }>({
  email: '',
  age: 0
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
  delete formUserPage.value.passwordCheck;
  delete formUserPage.value.password;
}

const confirmPasswordChange = async () => {
  const { password, passwordCheck } = formUserPage.value;

  if (!password || !passwordCheck) {
    messageError.value = t('notify.empty_fields');
    return;
  }
  messageError.value = '';
  const result = await checkUserPassword({ password: passwordCheck });

  if (!result?.result) {
    messageError.value = t('notify.wrong_password');
    return
  }
  messageError.value = '';
  dialog.value = 'none';
  return true;
}

const submitForm = async () => {
  const isValid = await validateForm();
  if (!isValid) return;

  if (isPasswordChange.value) {
    const isPasswordCorrect = await confirmPasswordChange();
    delete formUserPage.value.passwordCheck;
    if (!isPasswordCorrect) return;
  }


  let updatedUser: Partial<FormUserPageType> = {};
  (Object.entries(formUserPage.value) as [keyof FormUserPageType, any][]).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      updatedUser[key] = value;
    }

  });
  const result = await updateUser(updatedUser);

  if (!result?.result) {
    messageError.value = t('user_page.updating_error');
    messageNotify.value = '';
    return;
  }
  messageError.value = '';
  messageNotify.value = t('user_page.update_successfully');
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
    <form v-if="!isLoading" action="" class="px-3 flex flex-col gap-4 h-full">
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
      <div>
        <AppInputNumber
          v-model.number="formUserPage.age"
          :title="t('user_page.user_age')"
          :placeholder="t('user_page.enter_age')"
          :styles="'dark-mode'"
          :error="errors?.age"
          class="mb-1"
        />
        <p class="text-sm text-red-600">{{ errors?.age }}</p>
      </div>
      <div>
        <AppInputText
          v-model="formUserPage.email"
          :title="t('user_page.user_email')"
          :placeholder="t('user_page.enter_email')"
          :styles="'dark-mode'"
          :error="errors && errors.email"
          class="mb-1"
        />
        <p class="text-sm text-red-600">{{ errors?.email }}</p>
      </div>
      <AppInputPassword
        v-model="formUserPage.password"
        :title="t('user_page.password')"
        :placeholder-text="t('user_page.enter_password')"
        :field="'password'"
        :styles="'dark-mode'"
        @input-click="openConfirmPasswordChange"
        class="mb-4"
      />
      <p
        class="text-sm"
        :class="messageError ? 'text-red-600' : 'text-green-900'"
      >
        {{ messageError ? messageError : messageNotify }}
      </p>
      <div class="flex justify-between items-center gap-4 mt-auto mb-5">
        <AppButton :label="t('general.back')"  @click.prevent="emits('update:edit', false)"/>
        <AppButton :label="t('general.send')" @click.prevent="submitForm" />
      </div>
    </form>
    <LoaderComponent v-else />
  </div>

  <!-- dialog notify  -->
  <ModalComponent
    :show="dialog === 'notify'"
    full
    :title="t('user_page.confirm_password_change')"
    @update:dialog-visibility="dialog = $event"
  >
    <template #actions>
      <div v-if="!isLoading" class="flex flex-col gap-4">
        <div class="mb-5">
          <AppInputPassword
            v-model="formUserPage.passwordCheck"
            :title="t('user_page.enter_current_password')"
            :placeholder-text="t('user_page.enter_current_password')"
            :field="'password'"
            :styles="'dark-mode'"
            class="mb-4"
          />

          <AppInputPassword
            v-model="formUserPage.password"
            :title="t('user_page.enter_new_password')"
            :placeholder-text="t('user_page.enter_new_password')"
            :field="'passwordConfirm'"
            :styles="'dark-mode'"
          />
          <p class="text-sm text-red-600">{{ messageError }}</p>
        </div>
        <div class="flex items-center justify-center gap-4">
          <AppButton :label="t('general.confirm')" @click="confirmPasswordChange" />
          <AppButton :label="t('general.close')" @click="closeConfirm" />
        </div>
      </div>
      <LoaderComponent v-else />
    </template>
  </ModalComponent>
</template>

