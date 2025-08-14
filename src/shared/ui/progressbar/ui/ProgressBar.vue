<script setup lang="ts">
import { vTooltip } from "floating-vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type Props = {
  donePercentage: number;
}

defineProps<Props>();
</script>

<template>
  <div class="w-full bg-brown-medium h-5 rounded-lg relative">
    <p
      class="h-5 absolute top-0 left-0 bg-green-warm rounded-lg text-center"
      :style="`width: ${ donePercentage }%`"
      v-tooltip="t('general.done')"
    >
      <span class="text-white font-semibold text-md" >{{ donePercentage }} %</span>
    </p>
  </div>
</template>

<style scoped>

</style>
