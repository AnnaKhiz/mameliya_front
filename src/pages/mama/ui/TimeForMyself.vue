<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { TimerComponent } from "@/shared/ui/timer";
import { ref } from "vue";
import type { DialogEventsType } from "@/entities/calendar";
import ModalComponent from "@/shared/ui/modal";
import { AppButton } from "@/shared/ui/button";
import { FAQTimerInfo } from "@/pages/faq";

const { t } = useI18n();
const dialog = ref<DialogEventsType>('none');
const changeDialogState = (value: DialogEventsType) => {
  dialog.value = value;
}

</script>

<template>
  <div>
    <div class="flex justify-between items-start">
      <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.time_for_myself') }}:</h2>
      <p
        class="cursor-pointer font-semibold underline hover:text-brown-medium"
        @click="changeDialogState('instruction')"
      >
        {{ t('aside.faq.faq_timer') }}
      </p>
    </div>
      <div class="text-brown-dark flex flex-col justify-between items-start gap-3 mb-6">
      <p>{{ t('mama.time_for_myself_5_min') }}</p>
      <p>{{ t('mama.time_for_myself_reason') }}</p>
      <p>{{ t('mama.time_for_myself_woman') }}</p>
    </div>
  </div>
  <div class="shadow-2xl p-5 w-2/4 m-auto">
    <TimerComponent />
  </div>

  <!-- dialog instruction   -->
  <ModalComponent
    :show="dialog === 'instruction'"
    full
    :title="t('aside.faq.faq_timer')"
    :width="'w-4/6'"
    @update:dialog-visibility="changeDialogState"
  >
    <section class="w-full">
      <FAQTimerInfo no-title />
    </section>
    <div class="flex justify-start items-center gap-2 w-full">
      <AppButton :label="t('general.close')" @click="changeDialogState" />
    </div>
  </ModalComponent>
</template>

