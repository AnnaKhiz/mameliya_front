<script setup lang="ts">
import {useI18n} from "vue-i18n";
import ProgressBar from "@/shared/ui/progressbar";

const { t } = useI18n();
</script>

<template>
  <div class="w-full h-full grow-1">
    <div class="flex justify-between items-start">
      <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('aside.family.plans') }}:</h2>

    </div>
    <ProgressBar :done-percentage="30" />
  </div>
</template>

<style scoped>

</style>
