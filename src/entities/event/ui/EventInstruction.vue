<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/16/solid";
import { useI18n } from "vue-i18n";
import { AppButton } from "@/shared/ui/button";
const { t } = useI18n();

type Props = {
  closeDialogs: () => void,
}

const props = defineProps<Props>();
</script>

<template>
  <div class="bg-white text-brown-dark p-5 rounded-md w-4/6 h-auto flex flex-col items-start justify-start gap-4 ">
    <div class="flex justify-center items-center w-full">
      <h2 class="self-center font-bold text-xl w-full p-2 text-center">{{ t('mama.how_to_use') }}</h2>
      <XMarkIcon class="w-9 cursor-pointer justify-self-end" @click="props.closeDialogs" />
    </div>

    <div class="w-full flex flex-col items-start justify-start gap-3 px-5 pb-5 whitespace-pre-line">
      <p><span class="font-semibold">1.</span> {{ t('mama.event.instruction_1') }} </p>
      <p><span class="font-semibold">2.</span> {{ t('mama.event.instruction_2') }} </p>
      <p><span class="font-semibold">3.</span> {{ t('mama.event.instruction_3') }} </p>
      <p><span class="font-semibold">4.</span> {{ t('mama.event.instruction_4') }} </p>
      <p><span class="font-semibold">3.</span> {{ t('mama.event.instruction_5') }} </p>
      <p><span class="font-semibold">4.</span> {{ t('mama.event.instruction_5') }} </p>
      <p><span class="font-semibold">5.</span> {{ t('mama.event.instruction_7') }} </p>
    </div>
    <div class="flex justify-start items-center gap-2 w-full">
      <AppButton :label="t('general.close')" @click="props.closeDialogs" />
    </div>
  </div>
</template>
