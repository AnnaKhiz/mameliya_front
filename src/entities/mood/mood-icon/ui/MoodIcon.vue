<script setup lang="ts">
import { onMounted} from "vue";
import { useMamaStore } from "@/entities/mama";
import { useMoodStore } from "@/entities/mood";
import {storeToRefs} from "pinia";
import { vTooltip } from "floating-vue";
import {useI18n} from "vue-i18n";
import LoaderComponent from "@/features/loader";

const { t } = useI18n();
const { moodStatesList } = storeToRefs(useMoodStore());
const { mama, isLoading } = storeToRefs(useMamaStore());
const { getMamaInfo } = useMamaStore();

onMounted(async () => {
  await getMamaInfo();
})
</script>

<template>
  <div v-if="!isLoading">
    <div
      class="text-2xl w-fit"
      v-for="item in moodStatesList"
      :key="item.value"
      v-tooltip="t(`mama.mood_${item.value}`)"
    >
      {{ mama?.mood === item.value ? item.icon : '' }}
    </div>
  </div>
  <LoaderComponent v-else />

</template>
