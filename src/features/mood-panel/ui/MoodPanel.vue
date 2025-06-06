<script setup lang="ts">
import { FaceFrownIcon, FaceSmileIcon } from "@heroicons/vue/16/solid";
import type { MoodStateType } from "@/entities/mama";
import { onMounted, ref } from "vue";
import { useMamaStore } from "@/entities/mama";
import {storeToRefs} from "pinia";
const { mama } = storeToRefs(useMamaStore());
const { changeMamaMood, getMamaInfo } = useMamaStore();

const isMoodPanel = ref<boolean>(false);
const toggleMood = async (state: MoodStateType) => {
  await changeMamaMood({ mood: state});
  isMoodPanel.value = false;
}

const openMoodPanel = () => {
  isMoodPanel.value = true;
}

onMounted(async () => {
  await getMamaInfo();
})
</script>

<template>
  <div v-if="mama?.mood" class="relative">
    <FaceSmileIcon
      v-if="mama?.mood === 'good'"
      class="fill-green-mood w-7 cursor-pointer"
      @click="openMoodPanel"
    />
    <FaceSmileIcon
      v-if="mama?.mood === 'normal'"
      class="fill-yellow-600 w-7 cursor-pointer"
      @click="openMoodPanel"
    />
    <FaceFrownIcon
      v-if="mama?.mood === 'bad'"
      class="w-7 cursor-pointer fill-red-900"
      @click="openMoodPanel"
    />
    <Transition>
      <div v-if="isMoodPanel" class="flex items-center justify-center gap-2 absolute -top-12 left-0 bg-white/50 p-1 rounded-md shadow-2xl">
        <div class="hover:bg-white p-1 rounded-md transition duration-500 ">
          <FaceSmileIcon
            class="fill-green-mood w-7 cursor-pointer"
            @click="toggleMood('good')"
          />
        </div>
        <div class="hover:bg-white p-1 rounded-md transition duration-500">
          <FaceSmileIcon
            class="fill-yellow-600 w-7 cursor-pointer"
            @click="toggleMood('normal')"
          />
        </div>
        <div class="hover:bg-white p-1 rounded-md transition duration-500">
          <FaceFrownIcon
            class="w-7 cursor-pointer fill-red-900"
            @click="toggleMood('bad')"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
