<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {onMounted, watch, computed, ref} from "vue";
import { useUserStore } from "@/entities/user";
import {AppButton} from "@/shared/ui/button";
const { googleCalendarEvents, user, addNewEventToCalendar, removeGoogleCalendarEvent } = useUserStore();
const { userCalendarEvents } = storeToRefs((useUserStore()));
import { useRoute } from 'vue-router'
const route = useRoute();
const { t } = useI18n();
import { VueCal } from 'vue-cal';
import 'vue-cal/style'
import {storeToRefs} from "pinia";
import ModalComponent from "@/shared/ui/modal";
import {AppTextarea} from "@/shared/ui/form";
import { v4 as uuidv4 } from 'uuid';
import type { CalendarEventType } from "@/entities/user";

const connectGoogleCalendar = () => {
  window.location.href = 'http://localhost:3000/user/google/check';
}
type FormEventType = {
  title: string;
  description: string;
}

const calendarEventsList = ref<Record<string, any>[] | null>(null);
const isDialogOpen = ref<boolean>(false);
const formEventData = ref<FormEventType>({
  title: '',
  description: ''
});

const getGoogleCalendarEvents = async () => {
  await googleCalendarEvents('beauty');

  console.log('result', userCalendarEvents.value);

  calendarEventsList.value = userCalendarEvents?.value?.map((e: Record<string, any>) => {

    return {
      start: new Date(e.start.dateTime || e.start.date),
      end: new Date(e.end.dateTime || e.end.date),
      title: e.summary || 'No title',
      content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="size-4">\n' +
        '  <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />\n' +
        '</svg>\n',
      contentFull: e.description || '',
      backgroundColor: 'pink',
      color: '#523629',
      id: e.id,
      isAllDay: false
    }
  }).filter((elem: Record<string, any>) => elem.start && elem.end)

  console.log('calendarEventsList.value', calendarEventsList.value)
}

watch(() => route, (value) => {
  console.log(value)
}, { deep: true })

onMounted( async () => {
  if (user?.google_refresh) {
    await getGoogleCalendarEvents();
  }
})

type PendingValueType = {
  event: CalendarEventType;
  resolve: ( event: CalendarEventType ) => {}
}
const pendingEvent = ref<PendingValueType | null>(null);
const newEvent = ref<CalendarEventType | null>(null);
const createEvent = ( { event, resolve }: PendingValueType) => {
  openDialog()
  if (event.start) {
    pendingEvent.value = { event, resolve };
  }
  message.value = '';
}
const vuecalRef = ref<InstanceType<typeof VueCal> | null>(null)
const message = ref<string>('');
const saveEventDescription = async () => {
  const { title, description } = formEventData.value;

  if (title.trim() && description.trim() && pendingEvent.value?.event.start ) {

    const finalizedEvent = {
      ...pendingEvent.value.event,
      id: uuidv4(),
      title: formEventData.value.title,
      contentFull: formEventData.value.description,
    };

    pendingEvent.value?.resolve(finalizedEvent);

    const result = await addNewEventToCalendar({
      body: finalizedEvent,
      type: 'beauty'
    });

    if (!result.result) return;

    calendarEventsList.value?.push({
      start: new Date(result.data.start.dateTime),
      end: new Date(result.data.end.dateTime),
      title: result.data.summary || 'No title',
      content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="size-4">\n' +
        '  <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />\n' +
        '</svg>\n',
      contentFull: result.data.description || '',
      backgroundColor: 'pink',
      color: '#523629',
      id: result.data.id,
      isAllDay: false
    });

    console.log(calendarEventsList?.value)
    closeModal();
    return;
  }
  message.value = 'Can not save empty fields';

}

const openDialog = () => {
  isDialogOpen.value = true;
}

const closeModal = () => {
  console.log('calendarEventsList.value --- ', calendarEventsList.value)
  formEventData.value = {
    title: '',
    description: ''
  }

  newEvent.value = null;
  isDialogOpen.value = false;
  pendingEvent.value = null;
}


const isDetails = ref<boolean>(false);
const currentEvent = ref<CalendarEventType | null>(null);
const showDetails = ({ event }: { event: CalendarEventType}) => {
  isDetails.value = true;
  currentEvent.value = {
    ...event,
    start: parseDateToString(event.start as string),
    end: parseDateToString(event.end as string)
  };
  console.log('details', event)
}

const deleteEvent = async (id: string) => {
  const result = await removeGoogleCalendarEvent({ type: 'beauty', eventId: id});
  console.log('result del from component', result)
  vuecalRef.value?.view.deleteEvent({ id }, 3);
  isDetails.value = false;
}

const parseDateToString = (value: string): string => {
  if (!value) return ''

  let start = null;
  try {
    start = new Date(value);
  } catch (error) {
    console.log('Error creating Date object', error)
  }

  const hours = start?.getHours().toString().padStart(2, '0') || '';
  const minutes = start?.getMinutes().toString().padStart(2, '0') || '';
  const year = start?.getFullYear() || '';
  const month = start?.getMonth().toString().padStart(2, '0') || '';
  const day = start?.getDay().toString().padStart(2, '0') || '';

  if ([year, month, day].some(e => e === '00')) return '';

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
</script>

<template>
  <div class="flex flex-col justify-start items-start h-full w-full overflow-hidden p-5 bg-gradient-main">
    <div class="w-full">
      <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.beauty_calendar') }}:</h2>
      <div class="text-brown-dark flex flex-col justify-between items-start gap-3 mb-6">
        <p>{{ t('mama.beauty_calendar_about') }}</p>
        <p>{{ t('mama.beauty_calendar_what_inside') }}</p>
        <p>{{ t('mama.beauty_calendar_remind') }}</p>
      </div>
      <AppButton
        v-if="!user?.google_refresh"
        :label="t('mama.connect_google_calendar')"
        class="mb-4 mr-4"
        @click.prevent="connectGoogleCalendar"
      />
      <Vue-cal
        v-else
        ref="vuecalRef"
        class="w-full"
        time-at-cursor
        time
        events-on-month-view
        view-default="week"
        :disable-views="[]"
        :editable-events="{ create: true, resize: false,  drag: true, delete: true }"
        :min-event-width="0"
        v-model:events="calendarEventsList"
        @event-create="createEvent"
        @event-click="showDetails"

      />
    </div>
    <code>{{ formEventData}}</code>
  </div>

  <!--  dialog add event -->
  <ModalComponent :is-show="isDialogOpen" full>
    <template #content>
      <div class="bg-white p-5 rounded-md w-2/6 h-auto flex flex-col items-start justify-start gap-4">
        <h2 class="self-center">{{ t('mama.event.modal_title') }}</h2>
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
              :message="message"
              class="w-full"
              dark-mode
              placeholder-text="mama.event.enter_event_description"
            />
          </div>
        </form>
        <div class="flex justify-start items-center gap-4">
          <AppButton :label="t('general.close')" @click="closeModal" />
          <AppButton :label="t('general.save')" @click="saveEventDescription" />
        </div>

      </div>
    </template>
  </ModalComponent>

  <!--  dialog show details -->
  <ModalComponent :is-show="isDetails" full>
    <template #content>
      <div v-if="currentEvent" class="bg-white text-brown-dark p-5 rounded-md w-2/6 h-auto flex flex-col items-start justify-start gap-4">
        <h2 class="self-center font-bold text-xl w-full p-2 text-center">{{ t('mama.event.modal_title') }}</h2>
        <div class="mb-2">
          <p>
            <span class="font-bold">{{ t('mama.event.title') }}</span>:
            {{ currentEvent.title }}
          </p>
          <p>
            <span class="font-bold">{{ t('mama.event.description') }}</span>:
            {{ currentEvent.description || currentEvent.contentFull }}
          </p>
          <p>
            <span class="font-bold">{{ t('mama.event.date_start') }}</span>:
            {{ currentEvent.start }}
          </p>
          <p>
            <span class="font-bold">{{ t('mama.event.date_end') }}</span>:
            {{ currentEvent.end }}
          </p>
        </div>
        <div class="flex justify-start items-center gap-4">
          <AppButton :label="t('general.close')" @click="isDetails = false" />
          <AppButton :label="t('general.delete')" @click="deleteEvent(currentEvent.id)" />
        </div>
      </div>
      <div v-else >
        {{ t('mama.event.no_details_event')}}
      </div>
    </template>
  </ModalComponent>
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
