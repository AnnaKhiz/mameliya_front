<script setup lang="ts">
import {useI18n} from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="w-full flex flex-col items-start justify-start gap-3 px-5 pb-5 whitespace-pre-line">
    <slot name="content" />
  </div>
  <div class="w-full flex flex-col items-start justify-start gap-3 px-5 pb-5 whitespace-pre-line">
    <p><span class="font-semibold">1.</span> {{ t('mama.calendar.instruction_1') }} </p>
    <p><span class="font-semibold">2.</span> {{ t('mama.calendar.instruction_2') }} </p>
    <p><span class="font-semibold">3.</span> {{ t('mama.calendar.instruction_3') }} </p>
    <p><span class="font-semibold">4.</span> {{ t('mama.calendar.instruction_4') }} </p>
    <p><span class="font-semibold">3.</span> {{ t('mama.calendar.instruction_5') }} </p>
    <p><span class="font-semibold">4.</span> {{ t('mama.calendar.instruction_6') }} </p>
    <p><span class="font-semibold">5.</span> {{ t('mama.calendar.instruction_7') }} </p>
  </div>
</template>

<style scoped>

</style>
