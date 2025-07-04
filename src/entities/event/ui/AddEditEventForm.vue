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
  currentEvent: CalendarEventType | null,
  dialog: DialogEventsType,
  resetForm: () => void,
}

const props = defineProps<Props>();

const formEventData = defineModel<FormEventType>() as Ref<FormEventType>;
const startDatedList = ref<TimeListValues[] | null>(null);
const endDatesList = ref<TimeListValues[] | null>(null);
const messageError = ref<string>('');
const messageTextarea = ref<string>('');

const saveEventDescription = async () => {
  const { title, description } = formEventData.value as FormEventType;
  const start = props.pendingEvent?.event.start || '';

  if (!title.trim() || !description.trim() && !start ) {
    messageTextarea.value = t('mama.event.empty_fields');
    return;
  }

  messageTextarea.value = '';
  const finalizedEvent: CalendarEventType = {
    ...props.pendingEvent?.event,
    start: start || '',
    title: formEventData.value?.title,
    description: formEventData.value?.description,
  };

  props.pendingEvent?.resolve(finalizedEvent);

  const result = await addNewEventToCalendar({
    body: finalizedEvent,
    type: 'beauty'
  });

  if (!result.result) {
    messageTextarea.value = t('notify.updates_not_saved');
    return;
  }

  messageTextarea.value = '';
  props.resetForm();
}

const saveEventChanges = async () => {
  const { title, description } = formEventData.value as FormEventType;

  if (!title.trim() && !description.trim() ) {
    messageTextarea.value = t('mama.event.empty_fields');
    return;
  }

  messageTextarea.value = '';
  const updatedEvent: CalendarEventType = {
    ...formEventData.value,
    start: `${formEventData.value.date} ${formEventData.value.start}`,
    end: `${formEventData.value.date} ${formEventData.value.end}`
  };

  delete updatedEvent.date;

  const result = await updateGoogleEvent({
    body: updatedEvent,
    type: 'beauty',
    eventId: props.currentEvent?.id
  })

  if (!result.result) {
    messageTextarea.value = t('notify.updates_not_saved');
    return;
  }

  messageTextarea.value = '';
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

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
const normalizeDate = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const setNewDate = (event: Record<string, any>) => {
  if (!props.currentEvent) return '';
  const todayDate = new Date();

  const eventDate = new Date(event.cell.start);
  eventDate.setHours(todayDate.getHours(), todayDate.getMinutes(), todayDate.getSeconds(), 0);

  const checkedFullDateTime = new Date(eventDate);
  const currentDay = new Date(props.currentEvent.start);
  const checkedDateOnly = normalizeDate(checkedFullDateTime);
  const currentDateOnly = normalizeDate(currentDay);

  if (checkedDateOnly < currentDateOnly) {
    messageError.value = t('mama.event.date_can_not_be_smaller');
    return;
  }

  if (checkedDateOnly > currentDateOnly) {
    messageError.value = '';
    startDatedList.value = createTimeValuesList(0, 0);
    endDatesList.value = createTimeValuesList(0, 0);
    formEventData.value.date = parseDateToString(event.cell.start, true);
    return
  }

  if (isSameDay(checkedDateOnly, currentDateOnly)) {
    messageError.value = '';
    const {
      startHours,
      startMinutes,
      endHours,
      endMinutes
    } = splitDate({ eventStart: props.currentEvent.start , eventEnd: props.currentEvent.end || '' });
    startDatedList.value = createTimeValuesList(+startHours, +startMinutes);
    endDatesList.value = createTimeValuesList(+endHours, +endMinutes);
    return;
  }
}

onMounted(() => {
  const isEditMode: boolean = props.dialog === 'edit';
  const eventStart: string | Date = (isEditMode ? props.currentEvent?.start : props.pendingEvent?.event.start) ?? '';
  const eventEnd: string | Date = (isEditMode ? props.currentEvent?.end : props.pendingEvent?.event.end) ?? '';

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
  <section>
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
          :message="messageTextarea"
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
            <select class="w-full light-mode bg-brown-dark text-white" v-model="formEventData.start" :disabled="!!messageError">
              <option v-for="item in startDatedList" :key="item.text" :value="item.value" class="hover:bg-brown-light">{{ item.text }}</option>
            </select>
          </div>
          <div class="w-full">
            <h2 class="mb-2">{{ t('mama.event.time_end') }}</h2>
            <select class="w-full light-mode bg-brown-dark text-white" v-model="formEventData.end" :disabled="!!messageError">
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
  </section>
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
