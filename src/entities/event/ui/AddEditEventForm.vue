<script setup lang="ts">
import { AppTextarea } from "@/shared/ui/form";
import { useI18n } from "vue-i18n";
import {computed, onMounted, ref, type Ref} from "vue";
import {AppButton} from "@/shared/ui/button";
import {
  type CalendarEventType,
  type DialogEventsType,
  type FormEventType,
  type PendingValueType,
  type TimeListValues,
  useGoogleEventStore
} from "@/entities/event";
// @ts-ignore
import { VueCal } from 'vue-cal';
import 'vue-cal/style';
import {parseDateToString} from "@/shared/lib/parseDateToString.ts";
import {XMarkIcon} from "@heroicons/vue/16/solid";
import {splitDate} from "@/shared/lib/splitDate.ts";

const { t } = useI18n();
const { addNewEventToCalendar, updateGoogleEvent } = useGoogleEventStore();

type Props = {
  pendingEvent: PendingValueType | null,
  currentEvent: CalendarEventType,
  dialog: DialogEventsType,
  resetForm: () => void,
}

const props = defineProps<Props>();
const formEventData = defineModel<FormEventType>() as Ref<FormEventType>;
const startDatedList = ref<TimeListValues[] | null>(null);
const endDatesList = ref<TimeListValues[] | null>(null);
const messageError = ref<string>('');

const saveEventDescription = async () => {
  const { title, description } = formEventData.value as FormEventType;

  if (!title.trim() && !description.trim() && !props.pendingEvent?.event.start ) {
    messageError.value = t('mama.event.empty_fields');
    return;
  }

  messageError.value = '';
  const finalizedEvent: CalendarEventType = {
    ...props.pendingEvent?.event,
    start: props.pendingEvent?.event.start || '',
    title: formEventData.value?.title,
    description: formEventData.value?.description,
  };

  props.pendingEvent?.resolve(finalizedEvent);

  const result = await addNewEventToCalendar({
    body: finalizedEvent,
    type: 'beauty'
  });

  if (!result.result) {
    messageError.value = t('notify.updates_not_saved');
  }

  messageError.value = '';
  props.resetForm();
}

const saveEventChanges = async () => {
  const { title, description } = formEventData.value as FormEventType;

  if (!title.trim() && !description.trim() ) {
    messageError.value = t('mama.event.empty_fields');
    return;
  }

  messageError.value = '';
  const updatedEvent: CalendarEventType = {
    ...formEventData.value,
    start: `${formEventData.value.date} ${formEventData.value.start}`,
    end: `${formEventData.value.date} ${formEventData.value.end}`
  };

  delete updatedEvent.date;

  const result = await updateGoogleEvent({
    body: updatedEvent,
    type: 'beauty',
    eventId: props.currentEvent.id
  })

  if (!result.result) {
    messageError.value = t('notify.updates_not_saved');
  }

  messageError.value = '';
  props.resetForm();
}

const createTimeValuesList = (hours: number, minutes: number) => {
  const maxHours = 24;
  const maxMinutes = 60;
  const finalList = [];
  let h = hours;
  let m = minutes;

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
}

const setNewDate = (event: Record<string, any>) => {
  const currentDay = new Date(props.currentEvent.start);

  if (event.cell.start < currentDay) {
    messageError.value = t('mama.event.date_can_not_be_smaller');
    return;
  }

  messageError.value = '';
  startDatedList.value = createTimeValuesList(0, 0);
  endDatesList.value = createTimeValuesList(0, 0);
  formEventData.value.date = parseDateToString(event.cell.start, true);
}

onMounted(() => {
  const isEditMode: boolean = props.dialog === 'edit';
  const eventStart: string | Date = (isEditMode ? props.currentEvent.start : props.pendingEvent?.event.start) ?? '';
  const eventEnd: string | Date = (isEditMode ? props.currentEvent.end : props.pendingEvent?.event.end) ?? '';

  const {
    startHours,
    startMinutes,
    endHours,
    endMinutes
  } = splitDate({ eventStart , eventEnd });

  startDatedList.value = createTimeValuesList(+startHours, +startMinutes);
  endDatesList.value = createTimeValuesList(+endHours, +endMinutes);
})
</script>

<template>
  <div class="bg-white p-5 rounded-md w-2/6 h-auto flex flex-col items-start justify-start gap-4 text-brown-dark">
    <div class="flex justify-center items-center w-full">
      <h2 class="self-center font-bold text-xl w-full p-2 text-center">{{ t('mama.event.modal_title') }}</h2>
      <XMarkIcon class="w-9 cursor-pointer justify-self-end" @click="props.resetForm" />
    </div>
    <form action="" class="flex flex-col items-start justify-start gap-4 w-full">
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
          :message="messageError"
          class="w-full"
          :is-reset="false"
          dark-mode
          placeholder-text="mama.event.enter_event_description"
        />
      </div>
      <div v-if="dialog === 'edit'" class="flex justify-start items-start gap-5 w-full text-brown-dark font-semibold text-md mb-1">
        <div>
          <h2 class="mb-2">{{ t('mama.event.event_date') }}</h2>
          <Vue-cal date-picker :selected-date="formEventData.date" @cell-click="setNewDate"/>
        </div>
        <div class="w-full">
          <div class="mb-6">
            <h2 class="mb-2">{{ t('mama.event.time_start') }}</h2>
            <select class="w-full light-mode bg-brown-dark text-white" v-model="formEventData.start">
              <option v-for="item in startDatedList" :key="item.text" :value="item.value" class="hover:bg-brown-light">{{ item.text }}</option>
            </select>
          </div>
          <div class="w-full">
            <h2 class="mb-2">{{ t('mama.event.time_end') }}</h2>
            <select class="w-full light-mode bg-brown-dark text-white" v-model="formEventData.end">
              <option v-for="item in endDatesList" :key="item.text" :value="item.value">{{ item.text }}</option>
            </select>
          </div>
        </div>
      </div>
      <p class="text-red-600 text-xs mb-1">{{ messageError }}</p>
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
