import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { MoodObject } from "@/entities/mood";
import { i18n } from "@/shared/config/i18n";
import type {
  MoodDetailsType,
  MoodDetailsBodyType,
  ResponseMoodDetailsType
} from "@/entities/mood";
import {fetchData} from "@/shared/api";
export const useMoodStore = defineStore('mood', () => {
  const moodStatesList = computed(():MoodObject[] => (
    [
      {
        text: i18n.global.t('mama.mood_calm'),
        icon: '🌞',
        value: 'calm',
      },
      {
        text: i18n.global.t('mama.mood_sad'),
        icon: '🌧',
        value: 'sad',
      },
      {
        text: i18n.global.t('mama.mood_angry'),
        icon: '😡',
        value: 'angry',
      },
      {
        text: i18n.global.t('mama.mood_happy'),
        icon: '🥰',
        value: 'happy',
      },
      {
        text: i18n.global.t('mama.mood_tired'),
        icon: '😴',
        value: 'tired',
      },
      {
        text: i18n.global.t('mama.mood_grateful'),
        icon: '❤️',
        value: 'grateful',
      },
    ]
  ))

  const mood = ref<MoodDetailsType | null>(null);
  const usersMoodList = ref<MoodDetailsType[] | null>(null);

  const getMoodInfoList = async (): Promise<any> => {
    let result: ResponseMoodDetailsType | null = null;
    try {
      result = await fetchData('user/mama/mood/get');

      if (result?.data) {
        usersMoodList.value = result?.data as MoodDetailsType[];
      }

    } catch (error) {
      console.error('Error [Change mood]: ', error);
    }
    return result;
  }
  const addMoodInfo = async (body: MoodDetailsBodyType): Promise<any> => {
    let result: ResponseMoodDetailsType | null = null;
    try {
      result = await fetchData('user/mama/mood/add', 'POST', {}, body);

      if (result?.data) {
        mood.value = result?.data as MoodDetailsType;
      }

    } catch (error) {
      console.error('Error [Change mood]: ', error);
    }
    return result;
  }

  return {
    mood,
    moodStatesList,
    usersMoodList,
    addMoodInfo,
    getMoodInfoList
  }
})
