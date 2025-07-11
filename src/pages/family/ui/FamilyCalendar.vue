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
import {FAQCalendar} from "@/shared/ui/faq";

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
          <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('family.family_calendar') }}:</h2>
          <p
            class="cursor-pointer font-semibold underline hover:text-brown-medium"
            @click="changeDialogState('instruction')"
          >
            {{ t('mama.how_to_use') }}
          </p>
        </div>
        <div class="flex flex-col justify-between items-start gap-2 mb-6">
          <p>{{ t('family.family_calendar_about') }}</p>
          <p>{{ t('family.family_calendar_what_inside') }}</p>
        </div>
        <CalendarComponent :type="'family'"  />
      </div>
    </div>


    <!-- dialog instruction   -->
    <FAQCalendar
      v-if="dialog === 'instruction'"
      @update:dialog-visibility="changeDialogState"
    />

  </section>
</template>

<style scoped>

</style>
