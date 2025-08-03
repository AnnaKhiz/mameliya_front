<script setup lang="ts">
import {
  CheckCircleIcon,
  ChevronDoubleUpIcon,
  PlusCircleIcon,
  StarIcon
} from "@heroicons/vue/16/solid";
import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import ModalComponent from "@/shared/ui/modal";
import {ref, watch} from "vue";
import type {DialogEventsType} from "@/entities/calendar";
import App from "@/App.vue";
import {AppButton} from "@/shared/ui/button";
const {
  openAddRitualForm,
  toggleIsChecked,
  toggleIsCheckedMultiple,
  saveToMyRituals,
  removeFromMyRituals,
  clearResponseError
} = useRitualStore();
const {
  isChecked,
  anyChecked,
  allChecked,
  isAddNewForm,
  responseError
} = storeToRefs(useRitualStore());
const { t } = useI18n();
type Props = {
  isAddIcon: boolean;
}
defineProps<Props>();

const dialog = ref<DialogEventsType>('none');
const messageNotify = ref<string>('');
const showConfirmDelete = () => {
  dialog.value = 'notify';
  messageNotify.value = t('rituals.remove_ritual_notify');
}
const handleRemove = async () => {
  dialog.value = 'none';
  messageNotify.value = '';
  await removeFromMyRituals();
}

const handleClose = (event: DialogEventsType) => {
  dialog.value = event;
  clearResponseError();
}

watch(() => responseError.value, (newValue) => {
  if (newValue) {
    dialog.value = 'notify';
    messageNotify.value = newValue;
  }
})
</script>

<template>
  <div class="mb-2 flex items-center gap-1 border-b border-brown-medium/20" :class="isAddIcon ? 'justify-between ' : 'justify-end'">
    <PlusCircleIcon
      v-if="isAddIcon"
      class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
      @click="openAddRitualForm"
      v-tooltip="isAddNewForm ? t('rituals.hide_add_new_ritual') : t('rituals.add_new_title')"
    />
    <div class="mb-2 flex items-center justify-end gap-1">
      <ChevronDoubleUpIcon
        @click="toggleIsChecked"
        :class="isChecked ? 'rotate-180' : ''"
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:rounded hover:cursor-pointer hover:bg-brown-light/40 transition duration-500"
        v-tooltip="isChecked ? t('rituals.hide_checkboxes') :  t('rituals.show_checkboxes')"
      />
      <CheckCircleIcon
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        @click="toggleIsCheckedMultiple"
        v-tooltip="allChecked ? t('rituals.uncheck_all') : t('rituals.check_all')"
      />
      <StarIcon
        v-if="anyChecked"
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        @click="isAddIcon ? showConfirmDelete() : saveToMyRituals()"
        v-tooltip="isAddIcon ? t('rituals.remove_from_my_rituals') : t('rituals.add_to_my_rituals')"
      />
    </div>
  </div>

  <!-- dialog notify  -->
  <ModalComponent
    :show="dialog === 'notify'"
    full
    :title="responseError ? t('general.error') : t('general.confirm')"
    @update:dialog-visibility="handleClose"
  >
    <template #default>
      <p>{{ messageNotify }}</p>
    </template>
    <template #actions>
      <div class="flex items-center justify-center gap-4">
        <AppButton v-if="!responseError" :label="t('general.confirm')" @click="handleRemove" />
        <AppButton :label="t('general.close')" @click="handleClose" />
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped>

</style>
