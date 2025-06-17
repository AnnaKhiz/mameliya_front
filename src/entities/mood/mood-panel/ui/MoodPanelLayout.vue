<script setup lang="ts">
import MoodIcon from "../../mood-icon";
import {ref} from "vue";
const isMoodPanel = ref<boolean>(false);

const emits = defineEmits(['updateModalShow'])
const toggleMoodPanel = () => {
  isMoodPanel.value = !isMoodPanel.value;
  emits('updateModalShow', isMoodPanel.value);
}

</script>

<template>
  <div @click="toggleMoodPanel">
    <MoodIcon />
    <slot name="content"/>
  </div>
</template>

