<script setup lang="ts">
import {useI18n} from "vue-i18n";
import ProgressBar from "@/shared/ui/progressbar";
import WeekRangePicker from "@/shared/ui/week-range-picker";
import {
  WeekDaysList,
  type WeekGridItemType,
  type WeekValuesListType
} from "@/shared/ui/week-days-grid";
import {computed, ref} from "vue";

import {ChevronLeftIcon, FolderPlusIcon } from "@heroicons/vue/16/solid";
import router from "@/app/router";
import mondayImg from "@/shared/assets/images/monday.webp";
import tuesdayImg from "@/shared/assets/images/tuesday.webp";
import wednesdayImg from "@/shared/assets/images/wednesday.webp";
import thursdayImg from "@/shared/assets/images/thursday.webp";
import fridayImg from "@/shared/assets/images/friday.webp";
import saturdayImg from "@/shared/assets/images/saturday.webp";
import sundayImg from "@/shared/assets/images/sunday.webp";
import ActionButtons from "@/shared/ui/week-days-grid/ui/ActionButtons.vue";

const { t } = useI18n();
const checkedMenu = ref<WeekValuesListType>('none');
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

const handleCheckedMenu = (value: WeekValuesListType) => {
  checkedMenu.value = value;
}
const goBack = () => {
  handleCheckedMenu('none');
  router.push({ name: 'user-family_plans'});
}

</script>

<template>
  <div class="w-full h-full grow-1">
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('aside.family.plans') }}:</h2>

    <ProgressBar :done-percentage="30" class="mb-4" />

    <div class="flex justify-between items-center mb-6 ">
      <div v-if="checkedMenu !== 'none'" class="flex justify-start items-center">
        <ChevronLeftIcon
          @click="goBack"
          class="w-10 fill-brown-dark cursor-pointer hover:fill-brown-medium outline-none"
          v-tooltip="t('general.back')"
        />

        <FolderPlusIcon
          class="w-8 fill-brown-dark cursor-pointer hover:fill-brown-medium outline-none"
          v-tooltip="t('general.add')"
        />
      </div>

      <WeekRangePicker class="m-auto"  />

      <ActionButtons v-if="checkedMenu !== 'none'" />
    </div>

    <div class="flex justify-start items-start h-full gap-2">
      <WeekDaysList
        @update:checked-menu="handleCheckedMenu"
        :checked-menu="checkedMenu"
        :week-days-list="weekDaysList"
        :is-grid="checkedMenu === 'none'"
        :class="checkedMenu !== 'none' ? 'w-1/5 h-full' : ''"
      />
      <div
        v-if="checkedMenu !== 'none'"
        class="border border-brown-dark w-full p-2"
      >
        content
      </div>
    </div>


  </div>
</template>

<style scoped>

</style>
