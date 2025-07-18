import {defineStore, storeToRefs} from "pinia";
import {computed, ref} from 'vue';
import {fetchData} from "@/shared/api";
import type {RitualDetailsItemType, RitualSectionType} from "@/entities/ritual";
import { useUserStore } from "@/entities/user";
import {useI18n} from "vue-i18n";

export const useRitualStore = defineStore('rituals', () => {
  const userStore = useUserStore();
  const { t } = useI18n();
  const ritualsList = ref<RitualDetailsItemType[] | []>([]);
  const checkedRitual = ref<RitualDetailsItemType | null>(null);
  const responseError = ref<string>('');
  const isChecked = ref<boolean>(false);
  const isAddNewForm = ref<boolean>(false);
  const description = ref<string>('');
  const checkedFavorites = ref<Record<string, any>>([{}]);
  const anyChecked = computed(() => ritualsList.value.some(e => e.checked));
  const allChecked = computed(() => ritualsList.value.every(e => e.checked));
  const handleCheck = (index: number) => {
    ritualsList.value[index].checked = !ritualsList.value[index].checked;
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
    checkedRitual.value = ritualsList.value[index];
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

  const getRitualsBySection = async (section: RitualSectionType) => {
    let result = null;
    try {
      result = await fetchData('user/rituals/:section','GET', { section });

      const parsedList = parseRitualsList(result.data);
      ritualsList.value = filterGeneralRituals(parsedList);

    } catch (error) {
      console.error('Error [ADD NEW RITUAL ', error);
    }
    return result;
  }

  const addToFavorites = async (body: Record<string, any>[]) => {
    let result = null;
    try {
      result = await fetchData(
        'user/rituals/favorites/add',
        'POST',
        { },
        body);

      if (result.code === 204) {
        responseError.value = t('general.duplicate');
      }

    } catch (error) {
      console.error('Error [ADD FAVORITE RITUAL] ', error);
    }
    return result;
  }


  const getFavoriteRituals = async () => {
    let result = null;
    try {
      result = await fetchData('user/rituals/favorites/get');

      ritualsList.value = parseRitualsList(result.data);
    } catch (error) {
      console.error('Error [GET FAVORITE RITUAL ', error);
    }
    return result;
  }

  const saveToMyRituals = async () => {
    const favoriteRituals = checkedFavorites.value.filter((e: Record<string, any>) => e.checked);
    await addToFavorites(favoriteRituals);
  }

  const parseRitualsList = (list: RitualDetailsItemType[]) => {
    return list.map((el: RitualDetailsItemType) => {
      return {
        ...el,
        cosmetic_name: JSON.parse(el.cosmetic_name as any),
        checked: false
      }
    });
  }

  const removeFromMyRituals = async () => {
    const favoriteRituals = checkedFavorites.value.filter((e: Record<string, any>) => e.checked);
    await removeMyRitualsRequest(favoriteRituals);
  }

  const removeMyRitualsRequest = async (body: Record<string, any>[]) => {
    let result = null;
    try {
      result = await fetchData('user/rituals/favorites/remove', 'DELETE', { }, body);
      ritualsList.value = parseRitualsList(result.data);
    } catch (error) {
      console.error('Error [REMOVE RITUAL ', error);
    }
    return result;
  }

  const filterGeneralRituals = (list: RitualDetailsItemType[]):RitualDetailsItemType[]  => {
    return list.filter((e: RitualDetailsItemType) => (e.creator === 'Admin' || e.creator === userStore.user?.userId));
  }

  return {
    ritualsList,
    isChecked,
    isAddNewForm,
    description,
    checkedFavorites,
    anyChecked,
    allChecked,
    checkedRitual,
    responseError,
    handleCheck,
    addNewRitual,
    openAddRitualForm,
    toggleIsChecked,
    toggleIsCheckedMultiple,
    openDescription,
    saveToMyRituals,
    getRitualsBySection,
    getFavoriteRituals,
    removeFromMyRituals
  }
})
