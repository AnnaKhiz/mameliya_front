<script setup lang="ts">
import {type MoodDetailsType, type MoodStateType, useMoodStore} from "@/entities/mood";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import { parseDateToLocaleString } from "@/shared/lib/parseDateToLocaleString.ts";
const { moodStatesList } = storeToRefs(useMoodStore());
const { t } = useI18n();
type Props = {
  item: MoodDetailsType;
}
const props = defineProps<Props>();
const parseMoodValues = (value: MoodStateType) => {
  const icon = moodStatesList.value.find(el => el.value === value)?.icon;
  return [icon, `${t(`mama.mood_${value}`)}`]
}

</script>

<template>
  <div class="flex justify-between items-start gap-4 text-brown-dark bg-brown-light/15 rounded-md shadow-md p-2">
    <div class="flex justify-start items-center gap-4">
      <div class="flex flex-col justify-center items-center min-w-[90px]">
        <p>
          {{ parseMoodValues(props.item.mood)[0] }}
        </p>
        <p>
          {{ parseMoodValues(props.item.mood)[1] }}
        </p>
      </div>
      <p>{{ props.item.comment}}</p>
    </div>
    <div>
      <p class="text-brown-medium opacity-65 text-end">{{ parseDateToLocaleString(props.item.date)[0] }}</p>
      <p class="text-brown-medium opacity-65 text-end">{{ parseDateToLocaleString(props.item.date)[1] }}</p>
    </div>

  </div>

</template>
