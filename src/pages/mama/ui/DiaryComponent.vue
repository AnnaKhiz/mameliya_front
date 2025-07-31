<script setup lang="ts">
import { ref} from 'vue';
import { useI18n } from "vue-i18n";
import {type DialogDiaryTypes, DiaryAddEditNote, DiaryList} from "@/pages/mama";
import { useMamaStore } from "@/entities/mama";
import LoaderComponent from "@/features/loader";
import {storeToRefs} from "pinia";
import ModalComponent from "@/shared/ui/modal";
import {AppButton} from "@/shared/ui/button";
import {AppInputPassword} from "@/shared/ui/form";
import { useUserStore } from "@/entities/user";
const { checkUserPassword, updateIsConfirmed } = useUserStore();
const { isConfirmed } = storeToRefs(useUserStore());
const { getDiaryPostsList } = useMamaStore();
const { isLoading } = storeToRefs(useMamaStore());
const { t } = useI18n();
const isShowFull = ref<boolean>(false);

const dialog = ref<DialogDiaryTypes>('none');
const messageNotify = ref<string>('');
const error = ref<string>('');
const password = ref<string>('');
const toggleShowList = () => {
  isShowFull.value = !isShowFull.value;
}

const changeDialogState = (value: DialogDiaryTypes) => {
  dialog.value = value;
}

const submitPassword = async () => {
  error.value = '';

  if (!password.value) return;
  const result = await checkUserPassword({ password: password.value});

  if (!result?.result) {
    error.value = t('notify.wrong_password');
    return;
  }

  error.value = '';
  updateIsConfirmed(true);

  changeDialogState('none');
  toggleShowList();

  await getDiaryPostsList();

}

const openConfirm = () => {
  if (!isConfirmed.value) {
    messageNotify.value = t('notify.repeat_password_description');
    changeDialogState('confirm');
  } else {
    toggleShowList();
  }
}

</script>

<template>
  <div class="flex justify-between items-center w-full ">
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.diary.title') }}</h2>
    <div >
      <h2
        v-if="isShowFull"
        @click="toggleShowList"
        class="text-brown-dark font-semibold mb-4 text-xl cursor-pointer hover:underline hover:text-brown-medium transition-colors duration-500"
      >
        {{ t('mama.diary.hide_list') }}
      </h2>
      <h2
        v-else
        @click="openConfirm"
        class="text-brown-dark font-semibold mb-4 text-xl cursor-pointer hover:underline hover:text-brown-medium transition-colors duration-500"
      >
        {{ t('mama.diary.show_list') }}
      </h2>
    </div>
  </div>

  <div v-if="!isShowFull" class="w-full">
    <p class="mb-1">{{ t('mama.diary.description_1') }}</p>
    <p class="mb-5">{{ t('mama.diary.description_2') }}</p>
    <DiaryAddEditNote class="w-2/3 m-auto" />
  </div>
  <div
    v-else-if="isShowFull && isConfirmed"
    class="h-screen overflow-auto w-full"
    id="diary"
  >
    <DiaryList v-if="!isLoading" />
    <LoaderComponent v-else />
  </div>

  <!-- dialog notify  -->
  <ModalComponent
    :show="dialog === 'confirm'"
    full
    :title="t('notify.confirm_open_diary')"
    @update:dialog-visibility="dialog = $event"
  >
    <template #default>
      <p class="mb-4">{{ messageNotify }}</p>
      <AppInputPassword
        field="password"
        v-model="password"
        :title="t('notify.repeat_password')"
        styles="dark-mode mb-1"
        :error="error"
      />
      <p v-if="error" class="mb-4 error-text">{{ error }}</p>
    </template>
    <template #actions>
      <div class="flex justify-center items-center gap-4">
        <AppButton :label="t('general.close')" @click="changeDialogState('none')"/>
        <AppButton :label="t('general.confirm')" @click="submitPassword"/>
      </div>
    </template>
  </ModalComponent>


</template>

<style scoped>
#diary::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  width: 2px;
  background: #735c52;
}

::-webkit-scrollbar-thumb {
  background: white;
}

</style>

