<script setup lang="ts">

import {useI18n} from "vue-i18n";
import {TimerComponent} from "@/shared/ui/timer";

const { t } = useI18n();

</script>

<template>
  <div>
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.time_for_myself') }}:</h2>
    <div class="text-brown-dark flex flex-col justify-between items-start gap-3 mb-6">
      <p>{{ t('mama.time_for_myself_5_min') }}</p>
      <p>{{ t('mama.time_for_myself_pause') }}</p>
      <p>{{ t('mama.time_for_myself_reason') }}</p>
      <p>{{ t('mama.time_for_myself_woman') }}</p>
    </div>
  </div>
  <div class="shadow-2xl p-5 w-2/4 m-auto">
    <TimerComponent />
  </div>
</template>

<style scoped>

</style>
