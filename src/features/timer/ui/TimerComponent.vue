<script setup lang="ts">

import {PauseIcon, PlayIcon} from "@heroicons/vue/16/solid";
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import {useMamaStore} from "@/entities/mama";
const { t } = useI18n();
const { mama } = storeToRefs(useMamaStore());
type IntervalIDType = ReturnType<typeof setInterval>;
const timerList = computed(() => {
  const maxTimer = 60;

  const finalList = [];
  let i = 5;

  do {
    finalList.push({
      text: `${i} min`,
      value: i
    });
    i = i + 5;
  } while (i <= maxTimer);

  return finalList;
})
const isTimerPaused = ref<boolean>(false);
let timerValue = ref<string>('');
let stoppedTimerValue = ref<string>('');
const timerChecked = ref<number>(5);
let intervalID: IntervalIDType | null = null;
const timer = ref<string>('');
let seconds = 60;
const step = 1;
let minutes = 0;

type StorageTimerObjectType = {
  time: number;
  isPaused: boolean;
  pausedValue: string;
  date: number;
}

const localStorageTimer = ref<StorageTimerObjectType | null>()

onMounted(() => {
  const storageData = localStorage.getItem('mameliya_timer');
  if (storageData) {
    localStorageTimer.value = JSON.parse(storageData);

    const currentDate = new Date();
    const storageDate = new Date(localStorageTimer.value?.date ?? '');

    const timeDifference = currentDate.getTime() - storageDate.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60)

    if (hoursDifference >= 24) {
      localStorage.removeItem('mameliya_timer')
    }
  }

  timerChecked.value = localStorageTimer.value?.time ? localStorageTimer.value?.time : mama.value?.timer as number;

  timerValue.value = localStorageTimer.value?.isPaused ? `${localStorageTimer.value?.pausedValue}` : `${String(timerChecked.value).padStart(2, '0')}: 00`;
  stoppedTimerValue.value = localStorageTimer.value?.isPaused ? `${localStorageTimer.value?.pausedValue}` : `${String(timerChecked.value).padStart(2, '0')}: 00`;

  if (localStorageTimer.value?.pausedValue) {
    const [min, sec] = localStorageTimer.value?.pausedValue.split(': ').map(Number);
    minutes = min;
    seconds = sec;
  }

});

const handleChange = (event: Event) => {
  const element = event.target as HTMLSelectElement;
  stoppedTimerValue.value = '';
  timer.value = '';
  seconds = 60;
  timerChecked.value = localStorageTimer.value?.time && localStorageTimer.value?.time == +element?.value ? localStorageTimer.value?.time : +element?.value;

  localStorageTimer.value = {
    time: timerChecked.value,
    isPaused: stoppedTimerValue.value != '',
    pausedValue: stoppedTimerValue.value || '',
    date: Date.now(),
  }

  localStorage.setItem('mameliya_timer', JSON.stringify(localStorageTimer.value))

  timerValue.value = `${String(timerChecked.value).padStart(2, '0')}: 00`;
}

const countdown = () => {
  isTimerPaused.value = !isTimerPaused.value;
  minutes = timerChecked.value - 1;

  if (!isTimerPaused.value) {
    stoppedTimerValue.value = timer.value;

    localStorageTimer.value = {
      time: timerChecked.value,
      isPaused: true,
      pausedValue: stoppedTimerValue.value || '',
      date: Date.now(),
    }

    localStorage.setItem('mameliya_timer', JSON.stringify(localStorageTimer.value))

    if (intervalID) {
      clearInterval(intervalID);
    }
    return stoppedTimerValue.value;
  }

  timerValue.value = stoppedTimerValue.value ? stoppedTimerValue.value : `${String(timerChecked.value).padStart(2, '0')}: 00`;

  if (checkIsTimerFinished.value && isTimerPaused.value) {
    intervalID = setInterval(updateTimerDisplay, 1000);
  }
  return timerValue.value;
}

const updateTimerDisplay = () => {
  if (checkIsTimerFinished.value && isTimerPaused.value) {

    if (seconds === 0) {
      seconds = 60;
      minutes -= 1;
    }

    if (!checkIsTimerFinished.value) {
      timerValue.value = '00: 00';
      resetTimer();
      return;
    }

    seconds -= step;
    timer.value = `${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`;
    timerValue.value = timer.value;
    resetTimer();
  }
}

const checkIsTimerFinished = computed(() => {
  const [min, sec] = timerValue.value.split(': ').map(Number);
  return min != 0 || sec != 0;
})

const resetTimer = () => {
  if (!checkIsTimerFinished.value) {
    isTimerPaused.value = false;

    if (intervalID) {
      clearInterval(intervalID);
    }
  }
}
</script>

<template>
  <div class="shadow-2xl p-5">
    <h2 class="font-semibold mb-2 text-brown-dark">{{ t('mama.time_for_myself') }}:</h2>
    <div class="mb-3">
      <h3 class="text-brown-dark mb-2">{{ t('mama.set_time') }}:</h3>
      <select
        v-model="timerChecked"
        @change="handleChange"
        class="w-full mb-3"
        :disabled="isTimerPaused"
      >
        <option
          v-for="option in timerList"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div>
      <h3 class="text-brown-dark mb-2">{{ t('mama.start_timer') }}:</h3>
      <div v-if="checkIsTimerFinished" class="flex justify-start items-center gap-2 w-fit mx-auto">
        <span class="font-semibold text-brown-dark text-xl">{{ timerValue }}</span>
        <PlayIcon v-if="!isTimerPaused" class="w-6 fill-brown-dark cursor-pointer" @click="countdown"/>
        <PauseIcon v-else class="w-6 fill-brown-dark cursor-pointer" @click="countdown" />
      </div>
      <div v-else class="text-brown-dark font-semibold mb-1">
        {{ t('mama.timer_finished')}}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
