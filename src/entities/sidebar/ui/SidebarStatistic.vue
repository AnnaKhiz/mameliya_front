<script setup lang="ts">
import {SidebarLayout} from "@/entities/sidebar";
import {storeToRefs} from "pinia";
import {useMamaStore} from "@/entities/mama";
import {computed, onMounted, ref} from "vue";
import {MoodPanel, MoodPanelLayout} from "@/shared/ui/mood-panel";
import {useI18n} from "vue-i18n";
import {TimerComponent} from "../../../shared/ui/timer";
import {RitualsStatistic} from "@/pages/rituals";
const { t } = useI18n();
const { mama } = storeToRefs(useMamaStore());

const mood = computed(() => {
  switch(mama.value?.mood) {
    case 'good': return t('mama.mood_good');
    case 'bad': return t('mama.mood_bad');
    default: return t('mama.mood_normal');
  }
})

const isMoodPanel = ref<boolean>(false);


const updateModal = (value: boolean) => {
  isMoodPanel.value = value;
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
          <TimerComponent />
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
