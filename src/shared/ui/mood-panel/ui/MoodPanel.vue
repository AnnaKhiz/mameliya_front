<script setup lang="ts">

import {FaceFrownIcon, FaceSmileIcon} from "@heroicons/vue/16/solid";
import {type MoodStateType, useMamaStore} from "@/entities/mama";
const { changeMamaMood } = useMamaStore();

type Props = {
  isMoodPanel: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(['updateModalShow'])
const toggleMood = async (state: MoodStateType) => {
  await changeMamaMood({ mood: state});
  emits('updateModalShow', !props.isMoodPanel)
}
</script>

<template>

  <div class="flex items-center justify-center gap-2 absolute -bottom-12 left-0 bg-white p-1 rounded-md shadow-2xl">
    <div class="border border-transparent hover:border-brown-light hover:shadow-inner p-1 rounded-md transition duration-500 ">
      <FaceSmileIcon
        class="fill-green-mood w-7 cursor-pointer"
        @click="toggleMood('good')"
      />
    </div>
    <div class="hover:bg-white p-1 rounded-md transition duration-500 border border-transparent hover:border-brown-light hover:shadow-inner">
      <FaceSmileIcon
        class="fill-yellow-600 w-7 cursor-pointer "
        @click="toggleMood('normal')"
      />
    </div>
    <div class="hover:bg-white p-1 rounded-md transition duration-500 border border-transparent hover:border-brown-light hover:shadow-inner">
      <FaceFrownIcon
        class="w-7 cursor-pointer fill-red-900"
        @click="toggleMood('bad')"
      />
    </div>
  </div>

</template>

<style scoped>

</style>
