<script setup lang="ts">
import type {RitualDetailsItemType} from "@/entities/ritual";
import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import {storeToRefs} from "pinia";
const { openDescription, handleCheck } = useRitualStore();
const { checkedFavorites } = storeToRefs(useRitualStore());


type Props = {
  item: RitualDetailsItemType;
  index: number;
}

defineProps<Props>();

</script>

<template>
  <label
    :for="item.title"
    class="block"
    @click="openDescription(index)"
  >
    <input
      v-model="checkedFavorites[item.title]"
      type="checkbox"
      :name="item.title"
      :id="item.title"
      class="mr-2"
      :checked="item.checked"
      @change="handleCheck(index)"
    >
    {{ item.title }}
  </label>
</template>

<style scoped>

</style>
