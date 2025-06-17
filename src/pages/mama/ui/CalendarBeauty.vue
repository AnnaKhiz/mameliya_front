<script setup lang="ts">
import {useI18n} from "vue-i18n";

const { t } = useI18n();

</script>

<template>
  <div class="flex flex-col justify-start items-start h-full overflow-hidden p-5">
    <div>
      <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.beauty_calendar') }}:</h2>
    </div>
  </div>
</template>

<style scoped>

</style>
