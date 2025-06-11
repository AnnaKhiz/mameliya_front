<script setup lang="ts">
import { PlayIcon, PauseIcon } from "@heroicons/vue/16/solid";
import {SidebarLayout} from "@/entities/sidebar";
import {storeToRefs} from "pinia";
import {useMamaStore} from "@/entities/mama";
import {computed, onMounted, ref} from "vue";
import {MoodPanel, MoodPanelLayout} from "@/shared/ui/mood-panel";
import {useI18n} from "vue-i18n";
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

const mood = computed(() => {
  switch(mama.value?.mood) {
    case 'good': return t('mama.mood_good');
    case 'bad': return t('mama.mood_bad');
    default: return t('mama.mood_normal');
  }
})

const isMoodPanel = ref<boolean>(false);
const isTimerPaused = ref<boolean>(false);
let timerValue = ref<string>('');
let stoppedTimerValue = ref<string>('');
const timerChecked = ref<number>(5);
let intervalID: IntervalIDType | null = null;
const timer = ref<string>('');
let seconds = 60;
const step = 1;
let minutes = 0;

const updateModal = (value: boolean) => {
  isMoodPanel.value = value;
}

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
  <SidebarLayout :width="'150px'">
    <template #content>
      <div class="min-w-[150px] flex flex-col gap-2">
        <h2 class="font-semibold mb-3 text-brown-dark">{{ t('mama.main_statistic') }}</h2>
        <div class="p-5 shadow-2xl">
          <h2 class="font-semibold mb-2 text-brown-dark">{{ t('user.mood') }}</h2>
          <div class="flex justify-start items-center gap-2">
            <MoodPanelLayout @update-modal-show="updateModal" class="relative">
              <template #content>
                <Transition>
                  <MoodPanel v-if="isMoodPanel" :is-mood-panel="isMoodPanel" @update-modal-show="updateModal" />
                </Transition>
              </template>
            </MoodPanelLayout>
            <span class="text-brown-dark">{{ mood }}</span>
          </div>

        </div>

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
      </div>
    </template>
  </SidebarLayout>
</template>

<style scoped>

</style>
