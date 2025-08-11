<script setup lang="ts">
import { PauseIcon, PlayIcon } from "@heroicons/vue/16/solid";
import {vTooltip} from "floating-vue";
import { useI18n } from "vue-i18n";
import {computed, ref, watch} from "vue";
const { t } = useI18n();
type IntervalIDType = ReturnType<typeof setInterval>;
let intervalID: IntervalIDType | null = null;

type Props = {
  minutesDefault: number;
  secondsDefault: number;
  timerChecked: number;
  stoppedTimerValue: string;
  timerValueDefault: string;
}

const isTimerPaused = ref<boolean>(false);
let seconds = ref<number>(60);
let minutes = ref<number>(0);
const timer = ref<string>('');
let timerValue = ref<string>('');
const step = 1;

const emits = defineEmits(['updateIsTimerPaused', 'updateStopTimer', 'updateTimerValue'])
const props = defineProps<Props>();

const countdown = () => {
  isTimerPaused.value = !isTimerPaused.value;
  emits('updateIsTimerPaused', isTimerPaused.value)
  minutes.value = props.timerChecked - 1;

  if (!isTimerPaused.value) {
    emits('updateStopTimer', timer.value);

    const localStorageTimer = {
      time: props.timerChecked,
      isPaused: true,
      pausedValue: timer.value || '',
      date: Date.now(),
    }

    localStorage.setItem('mameliya_timer', JSON.stringify(localStorageTimer));

    if (intervalID) {
      clearInterval(intervalID);
    }
    return timer.value;
  }

  const updatedTimerValue = props.stoppedTimerValue ? props.stoppedTimerValue : `${String(props.timerChecked).padStart(2, '0')}: 00`;
  emits('updateTimerValue', updatedTimerValue);

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
      emits('updateTimerValue', '00: 00');
      resetTimer();
      return;
    }

    seconds.value -= step;
    timer.value = `${String(minutes.value).padStart(2, '0')}: ${String(seconds.value).padStart(2, '0')}`;
    timerValue.value = timer.value;
    emits('updateTimerValue', timer.value)
    resetTimer();
  }
}

const resetTimer = () => {
  if (!checkIsTimerFinished.value) {
    isTimerPaused.value = false;
    emits('updateIsTimerPaused', false);

    if (intervalID) {
      clearInterval(intervalID);
    }
  }
}
const checkIsTimerFinished = computed(() => {
  const [min, sec] = timerValue.value?.split(': ').map(Number);
  return min != 0 || sec != 0;
})

watch(() => props.timerValueDefault, (val: string) => timerValue.value = val, { immediate: true });
watch(() => props.minutesDefault, (val: number) => minutes.value = val, { immediate: true });
watch(() => props.secondsDefault, (val: number) => seconds.value = val, { immediate: true });

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
