import { defineStore } from "pinia";
import { computed } from "vue";
import type { MoodObject } from "@/shared/ui/mood";
import { i18n } from "@/shared/config/i18n";
export const useMoodStore = defineStore('mood', () => {
  const moodList = computed(():MoodObject[] => (
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
  return {
    moodList
  }
})
