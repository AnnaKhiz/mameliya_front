<script setup lang="ts">

import { TextEditor } from "@/shared/ui/text-editor";
import { AppButton } from "@/shared/ui/button";
import { XMarkIcon } from "@heroicons/vue/16/solid";
import {computed, onBeforeUnmount, ref} from "vue";
import type { DialogEventsType } from "@/entities/calendar";
import ModalComponent from "@/shared/ui/modal";
import { useI18n } from "vue-i18n";
import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
const { t } = useI18n();
const { addNewRitual } = useRitualStore()
const messageNotify = ref<string>('');
const dialog = ref<DialogEventsType>('none');
const isError = ref<boolean>(false);
const messageFormValidation = ref<string>('');

const newRitualForm = ref<{ title: string; description: string; section_key: string[]; cosmetic_name: string[] }>({
  title: '',
  description: '',
  section_key: [],
  cosmetic_name: []
});
const isFormValid = () => {
  const { title, description, section_key } = newRitualForm.value;
  return !(!title || !description || !section_key.length);
}
const sectionsList = [
  {
    text: 'Morning rituals',
    value: 'morning_rituals'
  },
  {
    text: 'Evening rituals',
    value: 'evening_rituals'
  },
  {
    text: 'Face care',
    value: 'face_care'
  },
  {
    text: 'My rituals',
    value: 'my_rituals'
  },
  {
    text: 'Hair care',
    value: 'hair_care'
  },
  {
    text: 'Body care',
    value: 'body_care'
  },
  {
    text: 'Nails care',
    value: 'nails_care'
  },
]
let timeoutId = null;
const submitForm = async (event: Event) => {
  if (!isFormValid()) {
    messageFormValidation.value = 'Fill empty fields';
    isError.value = true;
    return;
  }

  const result = await addNewRitual(newRitualForm.value);

  if (!result.result) return;

  isError.value = false;
  messageFormValidation.value = 'Ritual saved successfully!';
  timeoutId = setTimeout(() => {
    messageFormValidation.value = '';
  }, 1000)
  resetForm();

}

const resetForm = () => {
  newRitualForm.value = {
    title: '',
    description: '',
    section_key: [],
    cosmetic_name: []
  }
}

const cosmeticItem = ref<string>('');
const addCosmeticItem = (event: Event) => {
  if (!cosmeticItem.value) {
    dialog.value = 'notify';
    messageNotify.value = 'Enter cosmetic name!';
    return;
  }

  if (newRitualForm.value.cosmetic_name.length === 5) {
    dialog.value = 'notify';
    messageNotify.value = 'You can add maximum 5 cosmetic items!'
    return;
  }

  const duplicates = newRitualForm.value.cosmetic_name.some(e => e.toLowerCase() === cosmeticItem.value.toLowerCase());
  if (duplicates) {
    dialog.value = 'notify';
    messageNotify.value = 'You already added this cosmetic name!';
    return;
  }


  newRitualForm.value.cosmetic_name.push(cosmeticItem.value);
  cosmeticItem.value = '';
  messageNotify.value = ''

}
const removeCosmeticItem = (index: number) => {
  newRitualForm.value.cosmetic_name.splice(index, 1)
}
const descriptionValid = computed(() => !!((!newRitualForm.value.description || newRitualForm.value.description === '<p><br></p>') && isError.value));

onBeforeUnmount(() => clearTimeout(timeoutId));
</script>

<template>
  <div>
    <h2 class="mb-4 font-bold text-lg text-center">Add new ritual</h2>
    <form  action="" class="flex flex-col gap-4" >
      <div>
        <h2 class="mb-1">Title</h2>
        <input
          v-model="newRitualForm.title"
          type="text"
          placeholder="Add title"
          :class="isError && !newRitualForm.title ? 'error-style' : ''"
          class="w-full rounded dark-mode"
        >
      </div>
      <div>
        <div >
          <h2 class="mb-1">Select section</h2>
          <select
            v-model="newRitualForm.section_key"
            multiple
            class="w-full dark-mode"
            :class="isError && !newRitualForm.section_key.length ? 'error-style' : ''"
          >
            <option disabled value="">Select ritual section...</option>
            <option v-for="section in sectionsList" :key="section.value" :value="section.value">{{ section.text }}</option>
          </select>
        </div>
      </div>
      <div>
        <h2 class="mb-1">Add recommended cosmetic</h2>
        <input
          v-model="cosmeticItem"
          type="text"
          placeholder="Enter cosmetic name..."
          @keydown.enter.prevent="addCosmeticItem"
          class="w-full rounded dark-mode"
        >
        <div
          v-if="newRitualForm?.cosmetic_name && newRitualForm?.cosmetic_name.length"
          class="flex items-center justify-start flex-wrap py-2 gap-1"
        >
          <p
            v-for="(cosmetic, index) in newRitualForm.cosmetic_name"
            :key="cosmetic"
            class="py-1 pl-2 pr-7 rounded bg-brown-medium/40 text-brown-dark relative"
          >{{ cosmetic }}
            <XMarkIcon class="w-4 fill-brown-medium hover:fill-white transition duration-500 absolute top-1 right-1 cursor-pointer" @click="removeCosmeticItem(index)"/>
          </p>

        </div>
      </div>
      <div>
        <h2 class="mb-1">Description</h2>
        <TextEditor
          v-model="newRitualForm.description"
          class="rounded"
          :class="descriptionValid ? 'error-style' : ''"
        />
      </div>
      <p class="text-xs" :class="isError ? 'text-red-800' : 'text-green-900' ">{{ messageFormValidation }}</p>
      <AppButton label="Save" class="w-fit block" @click.prevent="submitForm"/>
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
