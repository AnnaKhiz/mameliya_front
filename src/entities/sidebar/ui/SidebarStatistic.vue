<script setup lang="ts">
import {SidebarLayout} from "@/entities/sidebar";
import {storeToRefs} from "pinia";
import {useMamaStore} from "@/entities/mama";
import { onMounted, ref} from "vue";
import {MoodPanelLayout} from "@/entities/mood/mood-panel";
import {useI18n} from "vue-i18n";
import {RitualsStatistic} from "@/pages/rituals";
const { t } = useI18n();
const { mama } = storeToRefs(useMamaStore());
const currentTimer = ref<number | string>();
// import { parseLocalStorage } from "@/shared/lib/parseTimerValues.ts";

onMounted(() => {
  // const { timer } = parseLocalStorage();
  // console.log('timer', timer)
  currentTimer.value = mama.value?.timer.paused_time;
})
</script>

<template>
  <SidebarLayout :width="'150px'">
    <template #content>
      <div class="min-w-[150px] flex flex-col gap-4">
        <h2 class="font-semibold mb-3 text-brown-dark">{{ t('mama.main_statistic') }}</h2>
        <div class="p-5 shadow-2xl">
          <h2 class="font-semibold mb-2 text-brown-dark">{{ t('user.mood') }}</h2>
          <div class="flex justify-start items-center gap-2">
            <MoodPanelLayout />
            <span class="text-brown-dark">{{ t(`mama.mood_${mama?.mood}`) }}</span>
          </div>
        </div>
        <div class="shadow-2xl p-5 text-brown-dark">
          <h2 class="font-semibold mb-2">{{ t('mama.time_for_myself') }}:</h2>
          <p>
            <span class="font-semibold">{{ t('mama.timer_left') }}:</span>
            {{ currentTimer }} {{ t('general.min') }}
          </p>
        </div>

        <div class="shadow-2xl p-5">
          <RitualsStatistic />
        </div>
      </div>
    </template>
  </SidebarLayout>
</template>

<style scoped>

</style>
