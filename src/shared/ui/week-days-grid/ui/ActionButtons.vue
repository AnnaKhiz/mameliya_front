<script setup lang="ts">
import { AdjustmentsVerticalIcon, QueueListIcon } from "@heroicons/vue/16/solid";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div
    class="flex justify-end items-center gap-4"
  >
    <AdjustmentsVerticalIcon
      class="w-8 fill-brown-dark cursor-pointer hover:fill-brown-medium outline-none"
      v-tooltip="t('general.filter')"
    />
    <QueueListIcon
      class="w-8 fill-brown-dark cursor-pointer hover:fill-brown-medium outline-none"
      v-tooltip="t('general.sort')"
    />
  </div>
</template>

<style scoped>

</style>
