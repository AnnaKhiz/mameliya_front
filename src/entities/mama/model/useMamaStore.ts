import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "@/shared/api";
import {
  type MamaResponseType,
  type ResponseMamaType,
  type DiaryFormType,
  type ResponseDiaryType,
  type DiaryObjectType
} from "@/entities/mama";
import type { MoodStateType } from "@/entities/mood";

export const useMamaStore = defineStore('mama', () => {
  const mama = ref<MamaResponseType | null>(null);

  const getMamaInfo = async (): Promise<any> => {
    let result: ResponseMamaType | null = null;
    try {
      result = await fetchData('user/mama/info');

      if (result?.data) {
        mama.value = result?.data;
      }

    } catch (error) {
      console.error('Error [Get mama info]: ', error);
    }
    return result;
  }
  const changeMamaMood = async (body: { mood: MoodStateType }): Promise<any> => {
    let result: ResponseMamaType | null = null;
    try {
      result = await fetchData('user/mama/mood', 'POST', {}, body);

      if (result?.data) {
        mama.value = result?.data;
      }

    } catch (error) {
      console.error('Error [Change mood]: ', error);
    }
    return result;
  }
  const addDiaryPost = async (body: { mood: DiaryFormType }): Promise<any> => {
    let result: ResponseDiaryType | null = null;
    try {
      result = await fetchData('user/mama/diary/add', 'POST', {}, body);

      if (result?.data && mama.value) {
        mama.value.diary = result?.data;
      }

    } catch (error) {
      console.error('Error [Change mood]: ', error);
    }
    return result;
  }



  return {
    mama,
    changeMamaMood,
    getMamaInfo,
    addDiaryPost
  }
})
