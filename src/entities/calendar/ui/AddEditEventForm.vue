<script setup lang="ts">
import { AppTextarea } from "@/shared/ui/form";
import { useI18n } from "vue-i18n";
import {computed, onMounted, ref, type Ref} from "vue";
import {AppButton} from "@/shared/ui/button";
import {
  calendar,
  type CalendarEventType,
  type DialogEventsType,
  type FormEventType,
  type PendingValueType,
  type TimeListValues,
  useGoogleEventStore
} from "@/entities/calendar";
// @ts-ignore
import { VueCal } from 'vue-cal';
import 'vue-cal/style';
import {parseDateToString} from "@/shared/lib/parseDateToString.ts";

const { t } = useI18n();
const { updateGoogleEvent } = useGoogleEventStore();

type Props = {
  pendingEvent?: PendingValueType | null,
  currentEvent?: CalendarEventType | null,
  dialog: DialogEventsType,
  resetForm: () => void,
}

const props = defineProps<Props>();

const formEventData = defineModel<FormEventType>() as Ref<FormEventType>;
const startDatedList = ref<TimeListValues[] | null>(null);
const endDatesList = ref<TimeListValues[] | null>(null);
const messageError = ref<string>('');
const messageTextarea = ref<string>('');
const pendingEvent = ref<PendingValueType | null>(null);

const validateEventForm = () => {
  const { title, description } = formEventData.value as FormEventType;
  const start = pendingEvent.value?.event.start || '';

  if (!title.trim() || !description.trim() && !start ) {
    messageTextarea.value = t('mama.calendar.empty_fields');
    return false;
  }
  messageTextarea.value = '';
  return { title, description };
}
const saveEventDescription = async () => {
  const form = validateEventForm();
  if (!form) return;

  const { title, description } = form;

  const result = await calendar.createEventRequest({
    title,
    description,
    type: 'beauty'
  })

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
    messageTextarea.value = t('mama.calendar.empty_fields');
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


const setNewDate = (event: Record<string, any>) => {
  if (!calendar.currentEvent) return '';
  //today full date
  const todayDate = new Date();

  const eventDate = new Date(event.cell.start);
  eventDate.setHours(todayDate.getHours(), todayDate.getMinutes(), todayDate.getSeconds(), 0);
  // checked date full
  const checkedFullDateTime = new Date(eventDate);
  // day event
  const currentDay = new Date(calendar.currentEvent.start);

  // day checked
  const checkedDateOnly = calendar.normalizeDate(checkedFullDateTime);

  const todayDateOnly = calendar.normalizeDate(todayDate)
  const currentDateOnly = calendar.normalizeDate(currentDay);

  // const dateObject = calendar.handleCheckedDateAndCompare(event);
  // if (!dateObject) return;
  //
  // const { checkedDateOnly, currentDateOnly } = dateObject;

  // switch(true) {
  //   case checkedDateOnly < currentDateOnly: {
  //     return messageError.value = t('mama.calendar.date_can_not_be_smaller');
  //   }
  //   case checkedDateOnly > currentDateOnly: {
  //     messageError.value = '';
  //     startDatedList.value = calendar.createTimeValuesList(0, 0);
  //     endDatesList.value = calendar.createTimeValuesList(0, 0);
  //     formEventData.value.date = parseDateToString(event.cell.start, true);
  //     return
  //   }
  //   case calendar.isSameDay(checkedDateOnly, currentDateOnly): {
  //     messageError.value = '';
  //     const {startList, endList} = calendar.generateEventTimeLists(props.dialog === 'edit');
  //     startDatedList.value = startList;
  //     endDatesList.value = endList;
  //     return
  //   }
  //   default: {
  //     return calendar.currentEvent
  // }
  // console.log('\ntodayDate', todayDate)
  // console.log('\ncurrentDay', currentDay)
  // console.log('checkedDateOnly', checkedDateOnly)
  // console.log('currentDateOnly', currentDateOnly)

  // if (checkedDateOnly < currentDateOnly && checkedDateOnly < todayDateOnly ) {
  //   console.log('\ncheckedDateOnly < currentDateOnly ! not < than TODAY', checkedDateOnly, currentDateOnly)
  //   console.log('checkedDateOnly', checkedDateOnly)
  //   console.log('currentDateOnly', currentDateOnly)
  //
  //   messageError.value = '';
  //   startDatedList.value = calendar.createTimeValuesList(0, 0);
  //   endDatesList.value = calendar.createTimeValuesList(0, 0);
  //   formEventData.value.date = parseDateToString(event.cell.start, true);
  //   return
  // }

  if (calendar.isSameDay(currentDateOnly , checkedDateOnly)) {
    console.log('This is today')
    messageError.value = '';
    const { startList, endList } = calendar.generateEventTimeLists(props.dialog === 'edit');
    // startDatedList.value = startList;
    endDatesList.value = endList;
    const now = new Date();
    startDatedList.value = calendar.createTimeValuesList(now.getHours(), now.getMinutes());
    // endDatesList.value = calendar.createTimeValuesList(0, 0);
    formEventData.value.date = parseDateToString(event.cell.start, true);
    messageError.value = '';
    return
  } else {
    console.log('This is not today')
    if (checkedDateOnly < currentDateOnly ) {
      messageError.value = t('mama.calendar.date_can_not_be_smaller');
      return;
    }
    if (checkedDateOnly > currentDateOnly) {
        // console.log('\ncheckedDateOnly > currentDateOnly', checkedDateOnly, currentDateOnly)
        // console.log('checkedDateOnly', checkedDateOnly)
        // console.log('currentDateOnly', currentDateOnly)
        messageError.value = '';
        startDatedList.value = calendar.createTimeValuesList(0, 0);
        endDatesList.value = calendar.createTimeValuesList(0, 0);
        formEventData.value.date = parseDateToString(event.cell.start, true);
        return
      }
  }

  // if (checkedDateOnly < currentDateOnly ) {
  //   console.log('\ncheckedDateOnly < currentDateOnly', checkedDateOnly, currentDateOnly)
  //   console.log('checkedDateOnly', checkedDateOnly)
  //   console.log('currentDateOnly', currentDateOnly)
  //
  //   messageError.value = t('mama.calendar.date_can_not_be_smaller');
  //   return;
  // }
  //
  //
  //
  // if (checkedDateOnly > currentDateOnly) {
  //   console.log('\ncheckedDateOnly > currentDateOnly', checkedDateOnly, currentDateOnly)
  //   console.log('checkedDateOnly', checkedDateOnly)
  //   console.log('currentDateOnly', currentDateOnly)
  //   messageError.value = '';
  //   startDatedList.value = calendar.createTimeValuesList(0, 0);
  //   endDatesList.value = calendar.createTimeValuesList(0, 0);
  //   formEventData.value.date = parseDateToString(event.cell.start, true);
  //   return
  // }
  //
  // if (calendar.isSameDay(checkedDateOnly, currentDateOnly)) {
  //   console.log('\ncheckedDateOnly = currentDateOnly', checkedDateOnly, currentDateOnly)
  //   console.log('checkedDateOnly', checkedDateOnly)
  //   console.log('currentDateOnly', currentDateOnly)
  //   messageError.value = '';
  //   const {startList, endList} = calendar.generateEventTimeLists(props.dialog === 'edit');
  //   startDatedList.value = startList;
  //   endDatesList.value = endList;
  // }
}

onMounted(() => {
  calendar.initStore();
  const { startList, endList } = calendar.generateEventTimeLists(props.dialog === 'edit');
  startDatedList.value = startList;
  endDatesList.value = endList;
  pendingEvent.value = calendar.pendingEvent;
})

</script>

<template>
  <section>
    <form action="" class="flex flex-col items-start justify-start gap-4 w-full">
      <div class="w-full">
        <h2 class="mb-2">{{ t('mama.calendar.modal_event_name') }}</h2>
        <input
          v-model="formEventData.title"
          type="text"
          class="w-full dark-mode placeholder:opacity-25"
          :placeholder="t('mama.calendar.enter_event_name')"
        />
      </div>
      <div class="w-full">
        <h2 class="mb-2">{{ t('mama.calendar.modal_event_description') }}</h2>
        <AppTextarea
          v-model="formEventData.description"
          :message="messageTextarea"
          class="w-full"
          :is-reset="false"
          dark-mode
          placeholder-text="mama.calendar.enter_event_description"
        />
      </div>
      <div v-if="dialog === 'edit'" class="flex justify-start items-start gap-5 w-full text-brown-dark font-semibold text-md mb-1">
        <div>
          <h2 class="mb-2">{{ t('mama.calendar.event_date') }}</h2>
          <Vue-cal date-picker :selected-date="formEventData.date" @cell-click="setNewDate"/>
        </div>
        <div class="w-full">
          <div class="mb-6">
            <h2 class="mb-2">{{ t('mama.calendar.time_start') }}</h2>
            <select class="w-full light-mode bg-brown-dark text-white" v-model="formEventData.start" :disabled="!!messageError">
              <option v-for="item in startDatedList" :key="item.text" :value="item.value" class="hover:bg-brown-light">{{ item.text }}</option>
            </select>
          </div>
          <div class="w-full">
            <h2 class="mb-2">{{ t('mama.calendar.time_end') }}</h2>
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
        :label="t(`mama.calendar.${ dialog === 'add' ? 'add_event' : 'save_changes' }`)"
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
