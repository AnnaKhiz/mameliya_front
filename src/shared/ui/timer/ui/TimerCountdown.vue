<script setup lang="ts">
import { PauseIcon, PlayIcon } from "@heroicons/vue/16/solid";
import {vTooltip} from "floating-vue";
import { useI18n } from "vue-i18n";
import {computed, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useMamaStore} from "@/entities/mama";

const { t } = useI18n();
const { mama } = storeToRefs(useMamaStore());
const { updateTimerValue } = useMamaStore();
type IntervalIDType = ReturnType<typeof setInterval>;
let intervalID: IntervalIDType | null = null;

const isTimerPaused = ref<boolean>(false);
let seconds = ref<number>(60);
let minutes = ref<number>(0);
const timer = ref<string>('');
let timerValue = ref<string>('');
const step = 1;


const countdown = async () => {


  console.log('minutes.value', minutes.value)
  console.log('seconds.value', seconds.value)
  const generalTimeInSeconds = minutes.value * 60 + seconds.value;
  console.log('generalTimeInSeconds', generalTimeInSeconds)


  isTimerPaused.value = !isTimerPaused.value;


  if (!isTimerPaused.value) {
    await updateTimerValue({ paused_time: generalTimeInSeconds, is_paused: true })

    if (intervalID) {
      clearInterval(intervalID);
    }
    return timer.value;
  }


  const updatedTimerValue = mama.value?.timer.paused_time ? mama.value?.timer.paused_time : `${String(mama.value?.timer.total_time).padStart(2, '0')}: 00`;
  console.log('updatedTimerValue', updatedTimerValue)

  if (checkIsTimerFinished.value && isTimerPaused.value) {
    intervalID = setInterval(updateTimerDisplay, 1000);
  }
  return updatedTimerValue;
}

const updateTimerDisplay = () => {
  if (checkIsTimerFinished.value && isTimerPaused.value) {

    if (seconds.value === 0) {
      seconds.value = 60;
      minutes.value -= 1;
    }

    if (!checkIsTimerFinished.value) {
      timerValue.value = '00: 00';
      resetTimer();
      return;
    }

    seconds.value -= step;
    timer.value = `${String(minutes.value).padStart(2, '0')}: ${String(seconds.value).padStart(2, '0')}`;
    timerValue.value = timer.value;
    resetTimer();
  }
}

const resetTimer = () => {
  if (!checkIsTimerFinished.value) {
    isTimerPaused.value = false;

    if (intervalID) {
      clearInterval(intervalID);
    }
  }
}

const checkIsTimerFinished = computed(() => {
  const [min, sec] = timerValue.value?.split(': ').map(Number);
  return min != 0 || sec != 0;
})

watch(() => mama.value?.timer, (newValue) => {
  if (newValue) {
    timerValue.value = parseSecondsToMinutes(mama.value?.timer.paused_time)
  }
})

const parseSecondsToMinutes = (value: number) => {
  minutes.value = Math.floor(value / 60);
  seconds.value = value%60
  return `${String(minutes.value).padStart(2, '0')}: ${String(seconds.value).padStart(2, '0')}`;
}

</script>

<template>
  <div>
    <h3 class="text-brown-dark mb-2">{{ t('mama.start_timer') }}:</h3>
    <div v-if="checkIsTimerFinished" class="flex justify-start items-center gap-2 w-fit mx-auto">
      <span class="font-semibold text-brown-dark text-xl">{{ timerValue }}</span>
      <PlayIcon
        v-if="!isTimerPaused"
        v-tooltip="t('general.start')"
        @click="countdown"
        class="w-6 fill-brown-dark cursor-pointer hover:animate-pulse"
      />
      <PauseIcon
        v-else
        v-tooltip="t('general.pause')"
        @click="countdown"
        class="w-6 fill-brown-dark cursor-pointer hover:animate-pulse"
      />
    </div>
    <div v-else class="text-brown-dark font-semibold mb-1">
      {{ t('mama.timer_finished')}}
    </div>
  </div>
</template>
