<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/16/solid";
const today = new Date();
const currentDate = ref(new Date());
const yearMonthList = [
  {
    month: 1,
    name: 'January'
  },
  {
    month: 2,
    name: 'February'
  },
  {
    month: 3,
    name: 'March'
  },
  {
    month: 4,
    name: 'April'
  },
  {
    month: 5,
    name: 'May'
  },
  {
    month: 6,
    name: 'June'
  },
  {
    month: 7,
    name: 'July'
  },
  {
    month: 8,
    name: 'August'
  },
  {
    month: 9,
    name: 'September'
  },
  {
    month: 10,
    name: 'October'
  },
  {
    month: 11,
    name: 'November'
  },
  {
    month: 12,
    name: 'December'
  }
]

// const startDate = ref<number>(0);
// const endDate = ref<number>(0);
// const minDate = ref()
// const month = ref<number>(0)
// const daysInTheMonth = ref<number>(0);
// const monthStandartLength = [1, 3, 5, 7, 8, 10, 12];
// const monthName = computed(() => (yearMonthList.find(e => e.month === month.value)?.name));
//
//
// // const overDaysValue = computed(() => (daysInTheMonth.value - endDate.value))
//
// onMounted(() => {
//   const today = new Date();
//   const dayNumber = today.getDay();
//   const day = today.getDate();
//   // minDate.value = today.setDate(day - 7);
//   // maxDate.value.setDate(day + 7);
//   month.value = today.getMonth() + 1;
//
//   if (month.value === 2) {
//     daysInTheMonth.value = 28;
//   } else {
//     daysInTheMonth.value = monthStandartLength.includes(month.value) ? 31 : 30;
//   }
//   startDate.value = day - ( dayNumber - 1);
//   console.log('startDate', startDate.value);
//   if (startDate.value < 7) {
//     const overDaysValue = Math.abs(startDate.value);
//     const daysInPrevMonth = monthStandartLength.includes(month.value) ? 31 : 30;
//     console.log('daysInPrevMonth', daysInPrevMonth)
//     startDate.value = daysInPrevMonth - overDaysValue;
//     endDate.value = week - overDaysValue;
//   } else {
//     endDate.value = (week - dayNumber) + day;
//   }
//
//
//   console.log('startDate', startDate.value);
//   console.log('endDate', endDate.value);
//
//   currentDate.value = parseDateToString(today, true);
// })
//
// const goToNextWeek = () => {
//   startDate.value = endDate.value + 1;
//   if (startDate.value > daysInTheMonth.value || endDate.value + 7 > daysInTheMonth.value) {
//   console.log('month value', month.value)
//
//     if (month.value === 2) {
//       daysInTheMonth.value = 28;
//     } else {
//       daysInTheMonth.value = monthStandartLength.includes(month.value) ? 31 : 30;
//     }
//
//     month.value = month.value + 1;
//     // console.log('THIS MONTH IS', month.value)
//     // console.log('endDate.value - ', endDate.value)
//
//     let overDaysValue = daysInTheMonth.value - Math.abs(endDate.value);
//     // console.log('overDaysValue', overDaysValue)
//     // console.log('daysInTheMonth.value', daysInTheMonth.value)
//
//     if (!overDaysValue) {
//       startDate.value = 1;
//       endDate.value = startDate.value + 6;
//
//     } else {
//       overDaysValue = 7 - overDaysValue;
//       startDate.value = endDate.value + 1;
//       endDate.value = overDaysValue;
//     }
//
//   } else {
//     endDate.value = endDate.value + 7;
//   }
// }
//
// const goToPrevWeek = () => {
//   const date = new Date(currentDate.value);
//   date.setDate(date.getDate() + 7);
//   currentDate.value = date;
//   // startDate.value = startDate.value - 7;
//   // if (startDate.value < 1) {
//   //   let overDaysValue = daysInTheMonth.value - Math.abs(startDate.value);
//   //   month.value = month.value - 1;
//   //
//   //   if (month.value === 2) {
//   //     daysInTheMonth.value = 28;
//   //   } else {
//   //     daysInTheMonth.value = monthStandartLength.includes(month.value) ? 31 : 30;
//   //   }
//   //
//   //   startDate.value = overDaysValue;
//   //   endDate.value = daysInTheMonth.value - 7; // wtf??
//   // } else {
//   //   endDate.value = (startDate.value + 7) - 1;
//   // }
// }
//
// watch(month, (newValue) => {
//   if (newValue > 12) {
//     month.value = 1;
//   }
//   if (newValue < 1) {
//     month.value = 12;
//   }
// })



const startOfWeek = computed(() => {
  const date = new Date(currentDate.value);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - (day - 1));
  return date;
});

const endOfWeek = computed(() => {
  const date = new Date(startOfWeek.value);
  date.setDate(date.getDate() + 6);
  return date;
});

const formatDate = (date: Date) =>
  date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

const isPrevActive = ref<boolean>(true);
const isNextActive = ref<boolean>(true);
const goPrevWeek = () => {
  const prevWeek = new Date(currentDate.value);
  prevWeek.setDate(prevWeek.getDate() - 7);
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 7);

  if (prevWeek >= minDate) {
    isPrevActive.value = false;
    currentDate.value = prevWeek;
  } else {
    isPrevActive.value = true;
  }

};


const goNextWeek = () => {
  const nextWeek = new Date(currentDate.value);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 7);

  if (nextWeek <= maxDate) {
    isNextActive.value = false;
    currentDate.value = nextWeek;
  } else {
    isNextActive.value = true;
  }
};
</script>

<template>

  <div class="flex items-center justify-center">
    <ChevronLeftIcon
      class="w-10 "
      :class="isPrevActive ? 'hover:cursor-pointer hover:fill-brown-medium hover:animate-pulse' : 'hover:cursor-default fill-brown-medium/30 hover:animate-none'"
      @click="goPrevWeek"
    />
    <div class="border-2 border-brown-medium/30 rounded-md py-1 px-8 text-center">
      <p>{{ formatDate(startOfWeek) }} – {{ formatDate(endOfWeek) }}</p>
      <p>{{  }}</p>
    </div>
    <ChevronRightIcon class="w-10 hover:cursor-pointer hover:fill-brown-medium hover:animate-pulse"  @click="goNextWeek"/>
  </div>
</template>

<style scoped>

</style>
