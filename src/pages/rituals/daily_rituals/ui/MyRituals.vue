<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import { useI18n } from "vue-i18n";

import {
  NewRitualForm,
  RitualDetailsActionsMenu,
  RitualDetailsList,
  type RitualDetailsItemType,
  RitualDetailsLayout
} from "@/entities/ritual";
const { t } = useI18n();

import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import {storeToRefs} from "pinia";
const { } = useRitualStore();
const { ritualsList, description, checkedFavorites, isAddNewForm } = storeToRefs(useRitualStore());

watch(() => ritualsList.value, (newValue) => {
  console.log('rituals list', ritualsList)
  if (newValue) {
    checkedFavorites.value = newValue.filter(e => e.checked);
  }
}, { deep: true })

</script>

<template>
  <RitualDetailsLayout>
    <template #content-left>
      <RitualDetailsActionsMenu />
      <RitualDetailsList />
    </template>

    <template #content-right>
      <p v-if="description && checkedFavorites.length && !isAddNewForm">{{ description }}</p>

      <div v-else-if="isAddNewForm" class="w-full h-full">
        <NewRitualForm />
      </div>
    </template>

  </RitualDetailsLayout>
</template>

<style scoped>

</style>
