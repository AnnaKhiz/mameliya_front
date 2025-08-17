<script setup lang="ts">
import {computed, ref} from 'vue';
import { useI18n } from "vue-i18n";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/16/solid";
const { t } = useI18n();
const today = new Date();
const currentDate = ref(new Date());

const minDate = new Date(today);
minDate.setDate(today.getDate() - 7);

const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 7);

const getStartOfWeek = (date: Date) => {
  const start = new Date(date);
  const day = start.getDay() || 7;
  start.setDate(start.getDate() - (day - 1));
  return start;
};

const startOfWeek = computed(() => getStartOfWeek(currentDate.value));
const endOfWeek = computed(() => {
  const end = new Date(startOfWeek.value);
  end.setDate(end.getDate() + 6);
  return end;
});

const formatDate = (date: Date) => {
  const fullDate = date.toLocaleDateString("en-EN", { day: "numeric", month: "long" });
  const dateArray = fullDate.split(' ');
  const day = dateArray[1];
  const month = t(`month.${dateArray[0].toLowerCase()}`);

  return `${day} ${month.toUpperCase()}`
}

const canGoPrevWeek = computed(() => {
  const prevWeek = new Date(currentDate.value);
  prevWeek.setDate(prevWeek.getDate() - 7);
  return prevWeek >= minDate;
});

const canGoNextWeek = computed(() => {
  const nextWeek = new Date(currentDate.value);
  nextWeek.setDate(nextWeek.getDate() + 7);
  return nextWeek <= maxDate;
});
const goPrevWeek = () => {
  if (canGoPrevWeek.value) {
    currentDate.value = new Date(currentDate.value.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
};

const goNextWeek = () => {
  if (canGoNextWeek.value) {
    currentDate.value = new Date(currentDate.value.getTime() + 7 * 24 * 60 * 60 * 1000);
  }
};
</script>

<template>

  <div class="flex items-center justify-center">
    <ChevronLeftIcon
      class="w-10 "
      :class="canGoPrevWeek ? 'hover:cursor-pointer hover:fill-brown-medium hover:animate-pulse' : 'hover:cursor-default fill-brown-medium/30 hover:animate-none'"
      @click="goPrevWeek"
    />
    <div class="border-2 border-brown-medium/30 rounded-md py-1 px-8 text-center">
      <p>{{ formatDate(startOfWeek) }} – {{ formatDate(endOfWeek) }}</p>
    </div>
    <ChevronRightIcon
      class="w-10 hover:cursor-pointer hover:fill-brown-medium hover:animate-pulse"
      :class="canGoNextWeek ? 'hover:cursor-pointer hover:fill-brown-medium hover:animate-pulse' : 'hover:cursor-default fill-brown-medium/30 hover:animate-none'"
      @click="goNextWeek"
    />
  </div>
</template>

<style scoped>

</style>
