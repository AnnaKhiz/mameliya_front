<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { ref } from "vue";
import {
  type DialogEventsType,
  EventInstruction,
  CalendarComponent,
} from "@/entities/calendar";
const { t } = useI18n();
import 'vue-cal/style';
import ModalComponent from "@/shared/ui/modal";

const dialog = ref<DialogEventsType>('none');
const changeDialogState = (value: DialogEventsType) => {
  dialog.value = value;
}
</script>

<template>
  <section>
    <div class="flex flex-col justify-start items-start h-full w-full overflow-hidden p-5 bg-gradient-main relative text-brown-dark ">
      <div class="w-full">
        <div class="flex justify-between items-start">
          <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.beauty_calendar') }}:</h2>
          <p class="cursor-pointer font-semibold underline hover:text-brown-medium" @click="changeDialogState('instruction')">{{ t('mama.how_to_use') }}</p>
        </div>
        <div class="flex flex-col justify-between items-start gap-2 mb-6">
          <p>{{ t('mama.beauty_calendar_about') }}</p>
          <p>{{ t('mama.beauty_calendar_what_inside') }}</p>
          <p>{{ t('mama.beauty_calendar_remind') }}</p>
        </div>
        <CalendarComponent :type="'beauty'"  />
      </div>
    </div>


    <!-- dialog instruction   -->
    <ModalComponent
      v-if="dialog === 'instruction'"
      full
      :title="t('mama.how_to_use')"
      :width="'w-4/6'"
      @update:dialog-visibility="changeDialogState"
    >
      <template #default>
        <EventInstruction :close-dialogs="changeDialogState" />
      </template>
    </ModalComponent>

  </section>
</template>

<style scoped>

</style>
