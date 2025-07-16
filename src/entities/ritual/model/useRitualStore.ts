import {defineStore} from "pinia";
import { ref } from 'vue';
import {fetchData} from "@/shared/api";

export const useRitualStore = defineStore('rituals', () => {
  const ritualsList = ref();

  const addNewRitual = async (body: Record<string, any>) => {
    let result = null;
    try {
      result = await fetchData('user/rituals/add/:section', 'POST', { section: body.section_key }, body);
    } catch (error) {
      console.error('Error [ADD NEW RITUAL ', error);
    }
    return result;
  }

  return {
    addNewRitual
  }
})
