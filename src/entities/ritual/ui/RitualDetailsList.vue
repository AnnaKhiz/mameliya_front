<script setup lang="ts">
import {
  RitualDetailsItemCheck,
  RitualDetailsItemLink,
} from "@/entities/ritual";
import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import {storeToRefs} from "pinia";
const { openDescription } = useRitualStore();
const { ritualsList, isChecked, checkedFavorites } = storeToRefs(useRitualStore());

</script>

<template>
  <div v-for="(item, index) in ritualsList" :key="item.id" >
    <RitualDetailsItemCheck
      v-if="isChecked"
      v-model="checkedFavorites"
      :item="item"
      :index="index"
    />
    <RitualDetailsItemLink
      v-else
      :title="item.title"
      @click="openDescription(index)"
    />
  </div>
</template>

<style scoped>

</style>
