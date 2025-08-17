<script setup lang="ts">
import {useI18n} from "vue-i18n";
import ProgressBar from "@/shared/ui/progressbar";
import WeekRangePicker from "@/shared/ui/week-range-picker";
import {WeekDaysGrid} from "@/shared/ui/week-days-grid";

const { t } = useI18n();
</script>

<template>
  <div class="w-full h-full grow-1">
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('aside.family.plans') }}:</h2>

    <ProgressBar :done-percentage="30" class="mb-4" />

    <WeekRangePicker class="mb-6" />

    <WeekDaysGrid />
  </div>
</template>

<style scoped>

</style>
