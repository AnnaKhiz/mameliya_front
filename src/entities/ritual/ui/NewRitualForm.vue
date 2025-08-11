<script setup lang="ts">

import { TextEditor } from "@/shared/ui/text-editor";
import { AppButton } from "@/shared/ui/button";
import {computed, onBeforeUnmount, ref} from "vue";
import type { DialogEventsType } from "@/entities/calendar";
import ModalComponent from "@/shared/ui/modal";
import { useI18n } from "vue-i18n";
import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import {
  sectionsList,
  type NewRitualFormType
} from "@/entities/ritual";
import {AppInputText, AppSelect} from "@/shared/ui/form";
import TagComponent from "@/shared/ui/tag";

const { t } = useI18n();
const { addNewRitual } = useRitualStore()
const messageNotify = ref<string>('');
const dialog = ref<DialogEventsType>('none');
const cosmeticItem = ref<string>('');
const isError = ref<boolean>(false);
const messageFormValidation = ref<string>('');
let timeoutId: ReturnType<typeof setTimeout>;

const newRitualForm = ref<NewRitualFormType>({
  title: '',
  description: '',
  section_key: [],
  cosmetic_name: []
});
const isFormValid = () => {
  const { title, description, section_key } = newRitualForm.value;
  return !(!title || !description || !section_key?.length);
}
const submitForm = async () => {
  if (!isFormValid()) {
    messageFormValidation.value = t('notify.empty_fields');
    isError.value = true;
    return;
  }

  const result = await addNewRitual(newRitualForm.value);

  if (!result.result) return;

  isError.value = false;
  messageFormValidation.value = t('notify.successfully_saved');

  timeoutId = setTimeout(() => {
    messageFormValidation.value = '';
  }, 1000);

  resetForm();
}
const resetForm = () => {
  newRitualForm.value = {
    title: '',
    description: '<p><br></p>',
    section_key: [],
    cosmetic_name: []
  }
  isError.value = false;
}
const checkDuplicates = () => {
  const duplicates = newRitualForm.value.cosmetic_name?.some(e => e.toLowerCase() === cosmeticItem.value.toLowerCase());

  if (duplicates) {
    dialog.value = 'notify';
    messageNotify.value = t('rituals.item_already_added');
    return;
  }
  return true;
}
const checkQuantity = () => {
  if (newRitualForm.value.cosmetic_name?.length === 5) {
    dialog.value = 'notify';
    messageNotify.value = t('rituals.add_max_5_items');
    return;
  }
  return true;
}
const checkEmptyField = () => {
  if (!cosmeticItem.value) {
    dialog.value = 'notify';
    messageNotify.value = t('rituals.enter_cosmetic_item_name');
    return;
  }
  return true;
}
const checkItemBeforeSubmit = () => {
  if (!checkEmptyField() || !checkQuantity() || !checkDuplicates()) return;

  messageNotify.value = '';
  return true;
}
const addCosmeticItem = () => {
  if (!checkItemBeforeSubmit()) return;

  newRitualForm.value.cosmetic_name?.push(cosmeticItem.value);
  cosmeticItem.value = '';
}

const handleFormUpdate = (event: string[]) => {
  newRitualForm.value.cosmetic_name = event;
}
const descriptionValid = computed(() => ((!newRitualForm.value.description || newRitualForm.value.description === '<p><br></p>') && isError.value));

onBeforeUnmount(() => clearTimeout(timeoutId));

</script>

<template>
  <div class="w-4/5 m-auto">
    <h2 class="mb-4 font-bold text-lg text-center">{{ t('rituals.add_new_title') }}</h2>
    <form  action="" class="flex flex-col gap-4" >
      <AppInputText
        v-model="newRitualForm.title"
        :title="t('rituals.title')"
        :placeholder="t('rituals.enter_title')"
        :error="isError && !newRitualForm.title"
        styles="dark-mode"
      />
      <div>
        <AppSelect
          v-model="newRitualForm.section_key"
          multiple
          :title="t('rituals.select_section')"
          :disabled-field="t('rituals.select_ritual_section')"
          :list="sectionsList"
          :error="isError && !newRitualForm.section_key?.length"
        />
      </div>
      <div>
        <AppInputText
          v-model="cosmeticItem"
          :title="t('rituals.add_cosmetic')"
          :placeholder="t('rituals.enter_cosmetic_name')"
          @keydown.enter.prevent="addCosmeticItem"
          styles="dark-mode"
        >
          <template #content>
            <TagComponent
              v-if="newRitualForm?.cosmetic_name && newRitualForm?.cosmetic_name.length"
              :new-ritual-form="newRitualForm"
              @update:new-ritual-form="handleFormUpdate"
            />
          </template>
        </AppInputText>
      </div>

      <TextEditor
        v-model="newRitualForm.description"
        :title="t('rituals.ritual_description')"
        class="rounded"
        :error="descriptionValid"
      />

      <p class="text-xs" :class="isError ? 'text-red-800' : 'text-green-900' ">{{ messageFormValidation }}</p>
      <AppButton :label="t('general.save')" class="w-fit block" @click.prevent="submitForm"/>
    </form>
  </div>

  <!-- dialog notify  -->
  <ModalComponent
    :show="dialog === 'notify'"
    full
    :title="t('general.error')"
    @update:dialog-visibility="dialog = $event"
  >
    <template #default>
      <p>{{ messageNotify }}</p>
    </template>
  </ModalComponent>
</template>

<style scoped>

</style>
