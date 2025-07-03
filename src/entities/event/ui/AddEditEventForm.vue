<script setup lang="ts">
import { AppTextarea } from "@/shared/ui/form";
import { useI18n } from "vue-i18n";
import {computed, ref, type Ref} from "vue";
import {AppButton} from "@/shared/ui/button";
import {
  type CalendarEventType, type DialogEventsType,
  type FormEventType,
  type PendingValueType,
  useGoogleEventStore
} from "@/entities/event";
// @ts-ignore
import { VueCal } from 'vue-cal';
import 'vue-cal/style';
import {parseDateToString} from "@/shared/lib/parseDateToString.ts";

const { t } = useI18n();
const { addNewEventToCalendar } = useGoogleEventStore();

type Props = {
  pendingEvent: PendingValueType | null,
  dialog: DialogEventsType,
  resetForm: () => void,
}

const props = defineProps<Props>();
const formEventData = defineModel<FormEventType>() as Ref<FormEventType>;
const message = ref<string>('');

const saveEventDescription = async () => {
  const { title, description } = formEventData.value as FormEventType;

  if (!title.trim() && !description.trim() && !props.pendingEvent?.event.start ) {
    message.value = t('mama.event.empty_fields');
    return;
  }

  const finalizedEvent: CalendarEventType = {
    ...props.pendingEvent?.event,
    start: props.pendingEvent?.event.start || '',
    title: formEventData.value?.title,
    contentFull: formEventData.value?.description,
  };

  props.pendingEvent?.resolve(finalizedEvent);

  const result = await addNewEventToCalendar({
    body: finalizedEvent,
    type: 'beauty'
  });

  if (!result.result) {
    message.value = 'Event not saved';
  }

  props.resetForm();
}

const saveEventChanges = async () => {
  console.log('click save changes')
}

const hoursList = computed(() => {
  const maxHours = 24;
  const maxMinutes = 60;
  const finalList = [];
  let h = 0;
  let m = 0;

  do {
    finalList.push({
      text: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
      value: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    });

    m = m + 1;

    if (m === 60) {
      h = h + 1;
      m = 0;
    }
  } while (h < maxHours && m <= maxMinutes);

  return finalList;
})

const setNewDate = (event: Record<string, any>) => {
  formEventData.value.date = parseDateToString(event.cell.start, true);
}
</script>

<template>
  <div class="bg-white p-5 rounded-md w-2/6 h-auto flex flex-col items-start justify-start ">
    <h2 class="self-center">{{ t('mama.event.modal_title') }}</h2>
    <form action="" class="flex flex-col items-start justify-start  w-full">
      <div class="w-full">
        <h2 class="mb-2">{{ t('mama.event.modal_event_name') }}</h2>
        <input
          v-model="formEventData.title"
          type="text"
          class="w-full dark-mode placeholder:opacity-25"
          :placeholder="t('mama.event.enter_event_name')"
        />
      </div>
      <div class="w-full">
        <h2 class="mb-2">{{ t('mama.event.modal_event_description') }}</h2>
        <AppTextarea
          v-model="formEventData.description"
          :message="message"
          class="w-full"
          :is-reset="false"
          dark-mode
          placeholder-text="mama.event.enter_event_description"
        />
      </div>
      <div v-if="dialog === 'edit'" class="flex justify-start items-start gap-5 w-full text-brown-dark font-semibold text-md">
        <div>
          <h2 class="mb-2">{{ t('mama.event.event_date') }}</h2>
          <Vue-cal date-picker :selected-date="formEventData.date" @cell-click="setNewDate"/>
        </div>
        <div class="w-full">
          <div class="mb-6">
            <h2 class="mb-2">{{ t('mama.event.time_start') }}</h2>
            <select class="w-full light-mode bg-brown-dark text-white" v-model="formEventData.start">
              <option v-for="item in hoursList" :key="item.text" :value="item.value" class="hover:bg-brown-light">{{ item.text }}</option>
            </select>
          </div>
          <div class="w-full">
            <h2 class="mb-2">{{ t('mama.event.time_end') }}</h2>
            <select class="w-full light-mode bg-brown-dark text-white" v-model="formEventData.end">
              <option v-for="item in hoursList" :key="item.text" :value="item.value">{{ item.text }}</option>
            </select>
          </div>
        </div>


      </div>

    </form>
    <div class="flex justify-start items-center gap-4">
      <AppButton :label="t('general.close')" @click="resetForm" />
      <AppButton
        :label="t(`mama.event.${ dialog === 'add' ? 'add_event' : 'save_changes' }`)"
        @click="dialog === 'add' ? saveEventDescription() : saveEventChanges()"
      />
    </div>
  </div>
</template>

<style scoped>
.vuecal {
  --vuecal-primary-color: #523629;
  --vuecal-event-color: white;
}

.vuecal__event {
  background-color: #735c52;
}
</style>
