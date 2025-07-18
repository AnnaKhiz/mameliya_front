<script setup lang="ts">
import {
  CheckCircleIcon,
  ChevronDoubleUpIcon,
  PlusCircleIcon,
  StarIcon
} from "@heroicons/vue/16/solid";
import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import {storeToRefs} from "pinia";
const { openAddRitualForm, toggleIsChecked, toggleIsCheckedMultiple, saveToMyRituals } = useRitualStore();
const { isChecked, anyChecked } = storeToRefs(useRitualStore());

type Props = {
  isAddIcon: boolean;
}
defineProps<Props>();
</script>

<template>
  <div class="mb-2 flex items-center gap-1" :class="isAddIcon ? 'justify-between ' : 'justify-end'">
    <PlusCircleIcon
      v-if="isAddIcon"
      class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
      @click="openAddRitualForm"
      v-tooltip="'Add new ritual'"
    />
    <div class="mb-2 flex items-center justify-end gap-1">
      <ChevronDoubleUpIcon
        @click="toggleIsChecked"
        :class="isChecked ? 'rotate-180' : ''"
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:rounded hover:cursor-pointer hover:bg-brown-light/40 transition duration-500"
        v-tooltip="'Show checkboxes'"
      />
      <CheckCircleIcon
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        @click="toggleIsCheckedMultiple"
        v-tooltip="'Check all'"
      />
      <StarIcon
        v-if="anyChecked"
        class="w-8 p-1 outline-none fill-brown-medium hover:fill-brown-dark hover:bg-brown-light/40 hover:rounded hover:cursor-pointer transition duration-500"
        @click="saveToMyRituals"
        v-tooltip="'Add to My rituals'"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
