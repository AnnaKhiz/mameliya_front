<script setup lang="ts">
import { ref } from 'vue';
import { vTooltip } from "floating-vue";
import {useMamaStore } from "@/entities/mama";
import { useMoodStore, type MoodStateType } from "@/entities/mood";
import { storeToRefs } from "pinia";
const { moodStatesList } = storeToRefs(useMoodStore())
const { changeMamaMood } = useMamaStore();

type Props = {
  isMoodPanel: boolean;
}

const isTooltip = ref<boolean>(false)
const props = defineProps<Props>();
const emits = defineEmits(['updateModalShow']);
const toggleMood = async (state: MoodStateType) => {
  await changeMamaMood({ mood: state});
  emits('updateModalShow', !props.isMoodPanel);
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 absolute -bottom-2 left-10 bg-white p-1 rounded-md shadow-2xl w-fit">
    <div class="flex items-center justify-start gap-2">
      <div
        v-for="item in moodStatesList"
        :key="item.value"
        class="border border-transparent hover:border-brown-light hover:shadow-inner p-1 rounded-md transition duration-500 text-2xl"
        v-tooltip="item.text"
        @click="toggleMood(item.value as MoodStateType)"
      >
        {{ item.icon}}
      </div>
    </div>
  </div>
</template>

