<script setup lang="ts">
import mondayImg from "@/shared/assets/images/monday.webp";
import tuesdayImg from "@/shared/assets/images/tuesday.webp";
import wednesdayImg from "@/shared/assets/images/wednesday.webp";
import thursdayImg from "@/shared/assets/images/thursday.webp";
import fridayImg from "@/shared/assets/images/friday.webp";
import saturdayImg from "@/shared/assets/images/saturday.webp";
import sundayImg from "@/shared/assets/images/sunday.webp";

import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import {
  WeekDaysItem,
  type WeekGridItemType,
  type WeekValuesListType
} from "@/shared/ui/week-days-grid";

const { t } = useI18n();
const weekDaysList = computed(():WeekGridItemType[] => ([
  {
    id: 1,
    title: t('week.monday'),
    value: 'monday',
    image: mondayImg,
    isWeekend: false,
  },
  {
    id: 2,
    title: t('week.tuesday'),
    value: 'tuesday',
    image: tuesdayImg,
    isWeekend: false,
  },
  {
    id: 3,
    title: t('week.wednesday'),
    value: 'wednesday',
    image: wednesdayImg,
    isWeekend: false,
  },
  {
    id: 4,
    title: t('week.thursday'),
    value: 'thursday',
    image: thursdayImg,
    isWeekend: false,
  },
  {
    id: 5,
    title: t('week.friday'),
    value: 'friday',
    image: fridayImg,
    isWeekend: false,
  },
  {
    id: 6,
    title: t('week.saturday'),
    value: 'saturday',
    image: saturdayImg,
    isWeekend: true,
  },
  {
    id: 7,
    title: t('week.sunday'),
    value: 'sunday',
    image: sundayImg,
    isWeekend: true,
  },
]));

const hovered = ref<WeekValuesListType>('none');

const onToggleHover = (value: WeekValuesListType) => {
  hovered.value = value;
}
</script>

<template>
  <div class="flex justify-center items-center gap-2 flex-wrap">
    <div
      v-for="item in weekDaysList"
      :key="item.id"
      @mouseover="onToggleHover(item.value)"
      @mouseleave="onToggleHover('none')"
      class="rounded-md w-1/6 "
    >
      <WeekDaysItem :item="item" :hovered="hovered" />
    </div>
  </div>
</template>

<style scoped>

</style>
