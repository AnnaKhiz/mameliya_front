<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useMamaStore } from "@/entities/mama";
import {
  TimerCountdown,
  TimerValuesList
} from "@/shared/ui/timer";
const { t } = useI18n();
const { mama } = storeToRefs(useMamaStore());
const { getMamaInfo } = useMamaStore()
const isTimerPaused = ref<boolean>(false);
const timerValue = ref<string>('');
const timerChecked = ref<number>(5);

watch(() => mama.value?.timer, (newValue) => {
  if (newValue) {
    timerChecked.value = mama.value?.timer?.total_time;
    timerValue.value = `${String(timerChecked.value).padStart(2, '0')}: 00`;
  }
})

onMounted(async() => {
  await getMamaInfo();
})

</script>

<template>
  <div>
    <h2 class="font-semibold mb-2 text-brown-dark">{{ t('mama.time_for_myself') }}:</h2>

    <TimerValuesList :is-timer-paused="isTimerPaused" />

    <TimerCountdown @update-timer-state="isTimerPaused = $event" />
  </div>
</template>
