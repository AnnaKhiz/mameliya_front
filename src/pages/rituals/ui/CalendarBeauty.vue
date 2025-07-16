<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { ref } from "vue";
import {
  type DialogEventsType,
  CalendarComponent,
} from "@/entities/calendar";
const { t } = useI18n();
import ModalComponent from "@/shared/ui/modal";
import FAQCalendarInfo from "../../faq/ui/FAQCalendarInfo.vue";
import { AppButton } from "@/shared/ui/button";

const dialog = ref<DialogEventsType>('none');
const changeDialogState = (value: DialogEventsType) => {
  dialog.value = value;
}
</script>

<template>
  <div class="w-full h-full">
    <div class="flex justify-between items-start">
      <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.beauty_calendar') }}:</h2>
      <p class="cursor-pointer font-semibold underline hover:text-brown-medium" @click="changeDialogState('instruction')">{{ t('mama.how_to_use') }}</p>
    </div>
    <CalendarComponent :type="'beauty'"  />
  </div>

  <!-- dialog instruction   -->
  <ModalComponent
    :show="dialog === 'instruction'"
    full
    :title="t('mama.how_to_use')"
    :width="'w-4/6'"
    @update:dialog-visibility="changeDialogState"
  >
    <section class="w-full">
      <FAQCalendarInfo
        @update:dialog-visibility="changeDialogState"
      >
        <template #content>
          <div class="flex flex-col justify-between items-start gap-2 mb-6">
            <p>{{ t('mama.beauty_calendar_about') }}</p>
            <p>{{ t('mama.beauty_calendar_what_inside') }}</p>
            <p>{{ t('mama.beauty_calendar_remind') }}</p>
          </div>
        </template>
      </FAQCalendarInfo>
    </section>
    <div class="flex justify-start items-center gap-2 w-full">
      <AppButton :label="t('general.close')" @click="changeDialogState" />
    </div>
  </ModalComponent>
</template>

