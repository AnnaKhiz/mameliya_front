<script setup lang="ts">
import {
  RitualDetailsItemCheck,
  RitualDetailsItemLink,
} from "@/entities/ritual";
import { useRitualStore } from "@/entities/ritual/model/useRitualStore.ts";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";

const { ritualsList, isChecked, checkedFavorites } = storeToRefs(useRitualStore());
const { t } = useI18n();
</script>

<template>
  <div v-if="ritualsList.length">
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
        :index="index"
      />
    </div>
  </div>

  <div v-else class="pt-5">
    <p class="mb-2">{{ t('rituals.no_rituals')}}</p>
    <p>{{ t('rituals.add_ritual')}}</p>
  </div>

</template>

<style scoped>

</style>
