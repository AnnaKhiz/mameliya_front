<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {StarIcon, CheckCircleIcon, ChevronDoubleUpIcon, PlusCircleIcon} from "@heroicons/vue/16/solid";
import {AppTextarea} from "@/shared/ui/form";
import {AppButton} from "@/shared/ui/button";
import{ useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
const { addNewRitual } = useRitualStore()

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
const newRitualForm = ref<{ title: string; description: string; section_key: string; }>({
  title: '',
  description: '',
  section_key: ''
});

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
const submitForm = async () => {
  console.log(newRitualForm);
  await addNewRitual(newRitualForm.value)
}
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
    <div class=" border border-brown-medium col-span-9 p-2">
      <code>Fav: {{ checkedFavorites}}</code>
      <p v-if="description && checkedFavorites.length && !isAddNewForm">{{ description }}</p>

      <form v-else action="" class="flex flex-col gap-3" @submit.prevent="submitForm">
        <div>
          <h2 class="mb-2">Title</h2>
          <input v-model="newRitualForm.title" type="text" placeholder="Add title">
        </div>
        <div>
          <h2 class="mb-2">Select section</h2>
          <select v-model="newRitualForm.section_key" >
            <option disabled value="">Select ritual section...</option>
            <option v-for="section in sectionsList" :key="section.value" :value="section.value">{{ section.text }}</option>
          </select>
        </div>
        <div>
          <h2 class="mb-2">Description</h2>
          <AppTextarea v-model="newRitualForm.description" is-reset="" message="" placeholder-text="Add description" />
        </div>
        <AppButton label="Save" class="w-fit"/>
      </form>
      <code>{{ newRitualForm}}</code>
    </div>
  </div>
</template>

<style scoped>

</style>
