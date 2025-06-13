<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useMamaStore } from "@/entities/mama";
import {
  type StorageTimerObjectType,
  TimerCountdown,
  TimerValuesList
} from "@/shared/ui/timer";
const { t } = useI18n();
const { mama } = storeToRefs(useMamaStore());
import { parseLocalStorage } from "@/shared/lib/parseLocalStorage.ts";

const isTimerPaused = ref<boolean>(false);
const timerValue = ref<string>('');
const stoppedTimerValue = ref<string>('');
const timerChecked = ref<number>(5);
let seconds = 60;
let minutes = 0;

const localStorageTimer = ref<StorageTimerObjectType | null>();
const handleChange = (value: number) => {
  stoppedTimerValue.value = '';
  seconds = 60;
  timerChecked.value = localStorageTimer.value?.time && localStorageTimer.value?.time == value ? localStorageTimer.value?.time : value;

  localStorageTimer.value = {
    time: timerChecked.value,
    isPaused: stoppedTimerValue.value != '',
    pausedValue: stoppedTimerValue.value || '',
    date: Date.now(),
  }

  localStorage.setItem('mameliya_timer', JSON.stringify(localStorageTimer.value));

  timerValue.value = `${String(timerChecked.value).padStart(2, '0')}: 00`;
}

onMounted(() => {
  const { localStorageTimerValue } = parseLocalStorage();
  localStorageTimer.value = localStorageTimerValue;
  timerChecked.value = localStorageTimer.value?.time ? localStorageTimer.value?.time : mama.value?.timer as number;

  timerValue.value = localStorageTimer.value?.isPaused ? `${localStorageTimer.value?.pausedValue}` : `${String(timerChecked.value).padStart(2, '0')}: 00`;
  stoppedTimerValue.value = localStorageTimer.value?.isPaused ? `${localStorageTimer.value?.pausedValue}` : `${String(timerChecked.value).padStart(2, '0')}: 00`;

  if (localStorageTimer.value?.pausedValue) {
    const [min, sec] = localStorageTimer.value?.pausedValue.split(': ').map(Number);
    minutes = min;
    seconds = sec;
  }
});
</script>

<template>
  <div>
    <h2 class="font-semibold mb-2 text-brown-dark">{{ t('mama.time_for_myself') }}:</h2>

    <TimerValuesList
      v-model="timerChecked"
      :is-timer-paused="isTimerPaused"
      @update-checked-value="handleChange"
    />

    <TimerCountdown
      @update-is-timer-paused="isTimerPaused = $event"
      @update-stop-timer="stoppedTimerValue = $event"
      :minutes-default="minutes"
      :seconds-default="seconds"
      :timer-checked="timerChecked"
      :stopped-timer-value="stoppedTimerValue"
      :timer-value-default="timerValue"
    />
  </div>
</template>
