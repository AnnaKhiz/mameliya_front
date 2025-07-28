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
import {PlusCircleIcon, MinusCircleIcon } from "@heroicons/vue/16/solid";
// @ts-ignore
import md5 from 'blueimp-md5';
const dialog = ref<DialogEventsType>('none');
const isPasswordChange = ref<boolean>(false);
const messageNotify = ref<string>('');
const messageError = ref<string>('');
const errors = ref<{ [key: string]: string }>();
const formUserPage = ref<FormUserPageType & { passwordCheck?: string, photo?: Record<string, any> | null }>({
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

  const formData = new FormData();

  (Object.entries(formUserPage.value) as [keyof FormUserPageType, any][]).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(`${key}`, value)
    }
  });

  const result = await updateUser(formData);

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
const userAvatar = ref<string>('');
const getUserGravatar = () => {
  const cleanEmail = user.value?.email.trim().toLowerCase();
  const hash = md5(cleanEmail);
  userAvatar.value = `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`;
}

const handleFileChange = (event) => {
  console.log(event.target.files)
  formUserPage.value.photo = event.target.files[0]
}

onMounted(() => {
  getUserGravatar();
})

const updateAvatar = async () => {
  if (!formUserPage.value?.photo) {
    messageError.value = 'Photo did not select';
    return;
  }
  messageError.value = '';
  const formData = new FormData();
  formData.append('photo', formUserPage.value?.photo);
}

const removePhoto = () => {
  formUserPage.value.photo = null;
}

</script>

<template>
  <div class="w-full h-full">
    <form v-if="!isLoading" enctype="multipart/form-data" action="" class="px-3 flex flex-col gap-4 h-full">
      <div class="w-36 h-36 bg-brown-light rounded-2xl mb-4 cursor-pointer relative flex justify-between items-start object-cover">
        <img :src="user?.photo || userAvatar" alt="user avatar" class="rounded-2xl w-full h-full">
        <PlusCircleIcon class="w-9 fill-brown-dark absolute bottom-0 right-0" />
        <MinusCircleIcon v-if="formUserPage?.photo" class="w-9 fill-brown-medium absolute bottom-0 left-0" @click.stop="removePhoto" />
        <input type="file" @change="handleFileChange" name="photo" class="w-10 absolute bottom-0 right-0 opacity-0" />
      </div>

      <div v-if="formUserPage?.photo" class="pl-4 w-full">
        <p class="mb-4 w-full">{{ formUserPage?.photo?.name || ''}}</p>
      </div>

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

