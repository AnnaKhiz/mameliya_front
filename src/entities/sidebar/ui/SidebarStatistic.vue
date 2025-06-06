<script setup lang="ts">

import {SidebarLayout} from "@/entities/sidebar";
import {storeToRefs} from "pinia";
import {useMamaStore} from "@/entities/mama";
import {computed, onMounted, ref} from "vue";
import {MoodPanel, MoodPanelLayout} from "@/shared/ui/mood-panel";
const { mama } = storeToRefs(useMamaStore());

const mood = computed(() => {
  switch(mama.value?.mood) {
    case 'good': return 'Отличное';
    case 'bad': return 'Плохое';
    default: return 'Нормальное';
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
        <h2>Statistic</h2>
        <div class="border border-brown-dark p-5 ">
          <h2>Настроение:</h2>
          <code>{{isMoodPanel}}</code>
          <MoodPanelLayout @update-modal-show="updateModal" class="relative">
            <template #content>
              <MoodPanel v-if="isMoodPanel" :is-mood-panel="isMoodPanel" @update-modal-show="updateModal" ></MoodPanel>
            </template>
          </MoodPanelLayout>
        </div>

        <div class="border border-brown-dark p-5">
          <h2>5 минут для себя:</h2>
          <span>{{ mama.timer }}</span>
        </div>
      </div>
    </template>
  </SidebarLayout>
</template>

<style scoped>

</style>
