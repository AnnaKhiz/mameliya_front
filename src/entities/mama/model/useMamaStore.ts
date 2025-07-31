import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "@/shared/api";

import {
  type MamaResponseType,
  type ResponseMamaType,
  type DiaryFormType,
  type ResponseDiaryType,
} from "@/entities/mama";
import type { MoodStateType } from "@/entities/mood";

export const useMamaStore = defineStore('mama', () => {
  const mama = ref<MamaResponseType | null>(null);
  const isLoading = ref<boolean>(false);

  const getMamaInfo = async (): Promise<any> => {
    let result: ResponseMamaType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/mama/info');

      if (result?.data) {
        mama.value = result?.data;
      }
      isLoading.value = false;

    } catch (error) {
      console.error('Error [Get mama info]: ', error);
    }
    return result;
  }
  const changeMamaMood = async (body: { mood: MoodStateType }): Promise<any> => {
    let result: ResponseMamaType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/mama/mood', 'POST', {}, body);

      if (result?.data) {
        mama.value = result?.data;
      }
      isLoading.value = false;

    } catch (error) {
      console.error('Error [Change mood]: ', error);
    }
    return result;
  }
  const addDiaryPost = async (body: DiaryFormType ): Promise<any> => {
    let result: ResponseDiaryType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/mama/diary/add', 'POST', {}, body);

      if (result?.data && mama.value) {
        mama.value.diary = result?.data;
      }
      isLoading.value = false;

    } catch (error) {
      console.error('Error [Add diary post]: ', error);
    }
    return result;
  }

  const getDiaryPostsList = async (): Promise<any> => {
    let result: ResponseDiaryType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/mama/diary');
      isLoading.value = false;
      if (result?.data && mama.value) {
        mama.value.diary = result?.data;
      }

    } catch (error) {
      console.error('Error [Get diary post]: ', error);
    }
    return result;
  }

  const removeDiaryPost = async (id: string): Promise<any> => {
    let result: ResponseDiaryType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/mama/diary/remove/:id', 'DELETE', { id });

      if (result?.data && mama.value) {
        mama.value.diary = result?.data;
      }
      isLoading.value = false;

    } catch (error) {
      console.error('Error [Remove diary post]: ', error);
    }
    return result;
  }

  const updateDiaryPost = async (body: DiaryFormType, id: string): Promise<any> => {
    let result: ResponseDiaryType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/mama/diary/update/:id', 'PATCH', { id }, body);

      if (result?.data && mama.value) {
        mama.value.diary = result?.data;
      }
      isLoading.value = false;

    } catch (error) {
      console.error('Error [Update diary post]: ', error);
    }
    return result;
  }



  return {
    mama,
    isLoading,
    changeMamaMood,
    getMamaInfo,
    addDiaryPost,
    getDiaryPostsList,
    removeDiaryPost,
    updateDiaryPost
  }
})
