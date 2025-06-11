<script setup lang="ts">
import MoodIcon from "@/features/mood-icon";
import {storeToRefs} from "pinia";
import {useMamaStore} from "@/entities/mama";
import {ref} from "vue";
const { mama } = storeToRefs(useMamaStore());
const isMoodPanel = ref<boolean>(false);

const emits = defineEmits(['updateModalShow'])
const toggleMoodPanel = () => {
  isMoodPanel.value = !isMoodPanel.value;
  emits('updateModalShow', isMoodPanel.value);
}

</script>

<template>
  <div v-if="mama?.mood" @click="toggleMoodPanel">
    <MoodIcon v-if="mama?.mood" />
    <slot name="content"/>
  </div>
</template>

