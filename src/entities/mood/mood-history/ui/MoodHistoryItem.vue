<script setup lang="ts">
import {type MoodDetailsType, type MoodStateType, useMoodStore} from "@/entities/mood";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
const { moodStatesList } = storeToRefs(useMoodStore());
const { t } = useI18n();
type Props = {
  item: MoodDetailsType;
}
const props = defineProps<Props>();
const parseMoodValues = (value: MoodStateType) => {
  const icon = moodStatesList.value.find(el => el.value === value)?.icon;
  return `${icon} ${t(`mama.mood_${value}`)}`;
}

const parseDateToLocaleString = (value: number) => {
  return new Date(value).toLocaleString();
}
</script>

<template>
  <div>
    {{ parseDateToLocaleString(props.item.date) }} {{ parseMoodValues(props.item.mood) }} {{ props.item.comment}}
  </div>
</template>
