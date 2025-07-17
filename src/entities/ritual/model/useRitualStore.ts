import {defineStore} from "pinia";
import {computed, ref} from 'vue';
import {fetchData} from "@/shared/api";
import type {RitualDetailsItemType} from "@/entities/ritual";

export const useRitualStore = defineStore('rituals', () => {
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

  const isChecked = ref<boolean>(false);
  const isAddNewForm = ref<boolean>(false);
  const description = ref<string>('');
  const checkedFavorites = ref([{}]);
  const anyChecked = computed(() => ritualsList.value.some(e => e.checked));
  const allChecked = computed(() => ritualsList.value.every(e => e.checked));
  const handleCheck = (index: number) => {
    ritualsList.value[index].checked = !ritualsList.value[index].checked;
    console.log('rituals checked', ritualsList.value)
  }

  const openAddRitualForm = () => {
    isAddNewForm.value = !isAddNewForm.value;

  }

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

  const addNewRitual = async (body: Record<string, any>) => {
    let result = null;
    try {

      result = await fetchData(
        'user/rituals/add',
        'POST',
        { },
        body);
    } catch (error) {
      console.error('Error [ADD NEW RITUAL ', error);
    }
    return result;
  }

  const saveToMyRituals = () => {

}

  return {
    ritualsList,
    isChecked,
    isAddNewForm,
    description,
    checkedFavorites,
    anyChecked,
    allChecked,
    handleCheck,
    addNewRitual,
    openAddRitualForm,
    toggleIsChecked,
    toggleIsCheckedMultiple,
    openDescription,
    saveToMyRituals
  }
})
