<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {StarIcon, CheckCircleIcon, ChevronDoubleUpIcon, PlusCircleIcon, XMarkIcon} from "@heroicons/vue/16/solid";
import {AppTextarea} from "@/shared/ui/form";
import {AppButton} from "@/shared/ui/button";
import{ useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import ModalComponent from "@/shared/ui/modal";
import type { DialogEventsType } from "@/entities/calendar";
import { useI18n } from "vue-i18n";
import {TextEditor} from "@/shared/ui/text-editor";
const { addNewRitual } = useRitualStore()
const { t } = useI18n();
const isChecked = ref<boolean>(false);
const isAddNewForm = ref<boolean>(false);
const description = ref<string>('');
const ritualsList = ref([
  {
    id: 1,
    title: 'title 1',
    value: 'title1',
    description: 'Description 1',
    checked: false,
  },
  {
    id: 2,
    title: 'title 2',
    value: 'title2',
    description: 'Description 2',
    checked: false,
  },
  {
    id: 3,
    title: 'title 3',
    value: 'title3',
    description: 'Description 3',
    checked: false,
  }
]);
const isError = ref<boolean>(false);
const messageNotify = ref<string>('');
const messageFormValidation = ref<string>('');
const dialog = ref<DialogEventsType>('none');
const cosmeticList = ref()
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
const checkedFavorites = ref([{}])
const toggleIsChecked = () => {
  isChecked.value = !isChecked.value;
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

const toggleIsCheckedMultiple = () => {
  if (isChecked.value) {
    ritualsList.value = allChecked.value ?
      ritualsList.value.map(e => ({ ...e, checked: false }))
      : ritualsList.value.map(e => ({ ...e, checked: true }))
  } else {
    isChecked.value = true;
    ritualsList.value = ritualsList.value.map(e => ({ ...e, checked: isChecked.value }));
  }

}


const openDescription = (index: number) => {
  isAddNewForm.value = false;
  description.value = ritualsList.value[index].description;
}

const anyChecked = computed(() => ritualsList.value.some(e => e.checked));
const allChecked = computed(() => ritualsList.value.every(e => e.checked));

const handleCheck = (index: number) => {
  ritualsList.value[index].checked = !ritualsList.value[index].checked;
}
const saveToMyRituals = () => {

}
const openAddRitualForm = () => {
  isAddNewForm.value = !isAddNewForm.value;

}

watch(() => ritualsList.value, (newValue) => {
  console.log('rituals list', ritualsList)
  if (newValue) {
    checkedFavorites.value = newValue.filter(e => e.checked);
  }
}, { deep: true })
const submitForm = async (event: Event) => {
  if (!isFormValid()) {
    messageFormValidation.value = 'Fill empty fields';
    isError.value = true;
    return;
  }

  const result = await addNewRitual(newRitualForm.value);

  if (result.result) {
    isError.value = false;
    messageFormValidation.value = 'Ritual saved successfully!';
    resetForm();
  }
}

const resetForm = () => {
  newRitualForm.value = {
    title: '',
    description: '',
    section_key: [],
    cosmetic_name: []
  }
}

const cosmeticItem = ref<string>('')
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

}
const removeCosmeticItem = (index: number) => {
  newRitualForm.value.cosmetic_name.splice(index, 1)
}
const descriptionValid = computed(() => !!((!newRitualForm.value.description || newRitualForm.value.description === '<p><br></p>') && messageFormValidation.value));
</script>

<template>
  <div class="border border-brown-medium w-full h-full grid grid-cols-12">
    <div class="border border-brown-medium col-span-3 p-2">
      <div class="mb-2 flex items-center justify-between gap-1">
        <PlusCircleIcon
          class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
          @click="openAddRitualForm"
          v-tooltip="'Add new ritual'"
        />
        <div class="mb-2 flex items-center justify-end gap-1">
          <ChevronDoubleUpIcon
            @click="toggleIsChecked"
            :class="isChecked ? 'rotate-180' : ''"
            class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:rounded hover:cursor-pointer hover:bg-brown-light/40 transition duration-500"
            v-tooltip="'Show checkboxes'"
          />
          <CheckCircleIcon
            class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
            @click="toggleIsCheckedMultiple"
            v-tooltip="'Check all'"
          />
          <StarIcon
            v-if="anyChecked"
            class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
            @click="saveToMyRituals"
            v-tooltip="'Add to My rituals'"
          />
        </div>
      </div>
      <div v-for="(item, index) in ritualsList" :key="item.id" >
        <label
          v-if="isChecked"
          :for="item.value"
          class="block"
          @click="openDescription(index)"
        >
          <input
            v-model="checkedFavorites[item.value]"
            type="checkbox"
            :name="item.value"
            :id="item.value"
            class="mr-2"
            :checked="item.checked"
            @change="handleCheck(index)"
          >
          {{ item.title }}
        </label>
        <p v-else @click="openDescription(index)" class="text-brown-dark capitalize hover:font-bold hover:cursor-pointer mb-1 transition duration-500">{{ item.title }}</p>
      </div>

    </div>
    <div class="border border-brown-medium col-span-9 p-2">
      <p v-if="description && checkedFavorites.length && !isAddNewForm">{{ description }}</p>

      <div v-else class="w-full h-full">
        <div>
          <h2 class="mb-4 font-bold text-lg text-center">Add new ritual</h2>
          <form  action="" class="flex flex-col gap-4" >

            <div>
              <h2 class="mb-1">Title</h2>
              <input
                v-model="newRitualForm.title"
                type="text"
                placeholder="Add title"
                :class="messageFormValidation && !newRitualForm.title ? 'error-style' : ''"
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
                  :class="messageFormValidation && !newRitualForm.section_key.length ? 'error-style' : ''"
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
              <code>{{ newRitualForm.description}}</code>
              <h2 class="mb-1">Description</h2>
              <TextEditor
                v-model="newRitualForm.description"
                class="rounded"
                :class="descriptionValid ? 'error-style' : ''"
              />
            </div>
            <p class="text-xs" :class="isError ? 'text-red-800' : 'text-green-900' ">{{ messageFormValidation }}</p>
            <AppButton label="Save" class="w-fit block" @click.prevent="submitForm"/>




<!--              <AppTextarea-->
<!--                v-model="newRitualForm.description"-->
<!--                :is-reset="isError"-->
<!--                :max-length="600"-->
<!--                dark-mode-->
<!--                :message="messageFormValidation"-->
<!--                placeholder-text="Add description"-->
<!--                :error-style="!!(!newRitualForm.description && messageFormValidation)"-->
<!--              />-->

          </form>

        </div>


      </div>
    </div>
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
