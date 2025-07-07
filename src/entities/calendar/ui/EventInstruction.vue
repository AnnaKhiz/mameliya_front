<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { AppButton } from "@/shared/ui/button";
const { t } = useI18n();

type Props = {
  closeDialogs: (value: string) => void,
}

const props = defineProps<Props>();
</script>

<template>
  <section>
    <div class="w-full flex flex-col items-start justify-start gap-3 px-5 pb-5 whitespace-pre-line">
      <p><span class="font-semibold">1.</span> {{ t('mama.calendar.instruction_1') }} </p>
      <p><span class="font-semibold">2.</span> {{ t('mama.calendar.instruction_2') }} </p>
      <p><span class="font-semibold">3.</span> {{ t('mama.calendar.instruction_3') }} </p>
      <p><span class="font-semibold">4.</span> {{ t('mama.calendar.instruction_4') }} </p>
      <p><span class="font-semibold">3.</span> {{ t('mama.calendar.instruction_5') }} </p>
      <p><span class="font-semibold">4.</span> {{ t('mama.calendar.instruction_5') }} </p>
      <p><span class="font-semibold">5.</span> {{ t('mama.calendar.instruction_7') }} </p>
    </div>
    <div class="flex justify-start items-center gap-2 w-full">
      <AppButton :label="t('general.close')" @click="props.closeDialogs('none')" />
    </div>
  </section>
</template>
