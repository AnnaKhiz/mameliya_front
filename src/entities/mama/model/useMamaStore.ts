import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "@/shared/api";
import {
  type MoodStateType,
  type MamaResponseType,
  type ResponseMamaType
} from "@/entities/mama";
export const useMamaStore = defineStore('mama', () => {
  const mama = ref<MamaResponseType | null>(null);

  const changeMamaMood = async (body: { mood: MoodStateType }): Promise<any> => {
    let result: ResponseMamaType | null = null;
    try {
      result = await fetchData('user/mama/mood', 'POST', {}, body);

      if (result?.data) {
        mama.value = result?.data;
      }

    } catch (error) {
      console.error('Error [Sign up user]: ', error);
    }
    return result;
  }

  return {
    mama,
    changeMamaMood
  }
})
