<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import { useI18n } from "vue-i18n";

import {
  NewRitualForm,
  RitualDetailsActionsMenu,
  RitualDetailsList,
  type RitualDetailsItemType,
  RitualDetailsLayout
} from "@/entities/ritual";
const { t } = useI18n();
const isChecked = ref<boolean>(false);
const isAddNewForm = ref<boolean>(false);
const description = ref<string>('');


const ritualsList = ref<RitualDetailsItemType[]>([
  {
    id: 1,
    title: 'title 1',
    creator: 'title1',
    description: 'Description 1',
    checked: false,
    created_at: '123',
  },
  {
    id: 2,
    title: 'title 2',
    creator: 'title2',
    description: 'Description 2',
    checked: false,
    created_at: '123',
  },
  {
    id: 3,
    title: 'title 3',
    creator: 'title3',
    description: 'Description 3',
    checked: false,
    created_at: '123',
  }
]);

const checkedFavorites = ref([{}])
const toggleIsChecked = () => {
  isChecked.value = !isChecked.value;
}

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

</script>

<template>
  <RitualDetailsLayout>
    <template #content-left>
      <RitualDetailsActionsMenu
        :any-checked="anyChecked"
        :is-checked="isChecked"
        @update:is-checked="toggleIsChecked"
        @update:is-checked-multiply="toggleIsCheckedMultiple"
        @update:open-add="openAddRitualForm"
        @update:save-to-my-rituals="saveToMyRituals"
      />
      <RitualDetailsList
        v-model="checkedFavorites"
        :list="ritualsList"
        :is-checked="isChecked"
        @update:check-item="handleCheck"
        @update:open-description="openDescription"
      />
    </template>

    <template #content-right>
      <p v-if="description && checkedFavorites.length && !isAddNewForm">{{ description }}</p>

      <div v-else class="w-full h-full">
        <NewRitualForm />
      </div>
    </template>

  </RitualDetailsLayout>
</template>

<style scoped>

</style>
