<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {onMounted, watch, ref} from "vue";
import { useUserStore } from "@/entities/user";
import { AppButton } from "@/shared/ui/button";
import {
  type CalendarEventType,
  type FormEventType,
  type PendingValueType,
  type DialogEventsType,
  AddEditEventForm,
  useGoogleEventStore
} from "@/entities/event";
const { userCalendarEvents, isLoading } = storeToRefs(useGoogleEventStore());
const {
  googleCalendarEvents,
  removeGoogleCalendarEvent,
  parseUserCalendarEvents,
  connectGoogleCalendar
} = useGoogleEventStore();
const { user } = useUserStore();
const { t } = useI18n();
// @ts-ignore
import { VueCal } from 'vue-cal';
import 'vue-cal/style';
import {storeToRefs} from "pinia";
import ModalComponent from "@/shared/ui/modal";
import { parseDateToString } from "@/shared/lib/parseDateToString.ts";
import LoaderComponent from "@/features/loader";

const dialog = ref<DialogEventsType>('none');
const events = ref<CalendarEventType[] | null>();
const pendingEvent = ref<PendingValueType | null>(null);
const vuecalRef = ref<InstanceType<typeof VueCal> | null>(null);
const message = ref<string>('');
const currentEvent = ref<CalendarEventType | null>(null);
const formEventData = ref<FormEventType>({
  title: '',
  description: '',
  date: '',
  start: '',
  end: ''
});

const createEvent = ( { event, resolve }: PendingValueType) => {
  openDialog()
  if (event.start) {
    pendingEvent.value = { event, resolve };
  }
  message.value = '';
}

const openDialog = () => {
  dialog.value = 'add';
}

const showDetails = ({ event }: { event: CalendarEventType}) => {
  dialog.value = 'details';

  currentEvent.value = {
    ...event,
    start: parseDateToString(event.start as string),
    end: parseDateToString(event.end as string)
  };
}

const deleteEvent = async (id: string) => {
  const result = await removeGoogleCalendarEvent({ type: 'beauty', eventId: id});
  vuecalRef.value?.view.deleteEvent({ id }, 3);
  dialog.value = 'none';
}
const editEvent = async (event: CalendarEventType) => {
  dialog.value = 'edit';

  console.log(event)
  formEventData.value = {
    title: event.title || '',
    description: event.contentFull,
    date: event.start.toString().split(' ')[0],
    start: event.start.toString().split(' ')[1],
    end: event.end?.toString().split(' ')[1] || ''
  }
}

const dropEvent = ({ event }: { event: CalendarEventType}) => {
  console.log(event)
}

const resetForm = ():void => {
  dialog.value = 'none';
  pendingEvent.value = null;
  formEventData.value = {
    title: '',
    description: '',
    date: '',
    start: '',
    end: ''
  }
}

onMounted( async () => {
  if (user?.google_refresh) {
    await googleCalendarEvents('beauty');
    if (!userCalendarEvents.value) return;
    events.value = parseUserCalendarEvents(userCalendarEvents.value) as CalendarEventType[];
  }
})

watch(() => userCalendarEvents.value, (newValue) => {
  if (newValue) {
    events.value = parseUserCalendarEvents(newValue) as CalendarEventType[];
  }
}, { deep: true})

</script>

<template>
  <section>
    <div class="flex flex-col justify-start items-start h-full w-full overflow-hidden p-5 bg-gradient-main relative">
      <div v-if="!isLoading"  class="w-full">

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
          v-model:events="events"
          @event-create="createEvent"
          @event-click="showDetails"
          @event-drop = "dropEvent"
        />
      </div>
      <LoaderComponent v-else />
      <code>{{ formEventData}}</code>
    </div>
    <!--  dialog add event -->
    <ModalComponent v-if="!isLoading && dialog === 'add' || dialog === 'edit'" full>
      <template #default>
        <AddEditEventForm
          v-model="formEventData"
          :pending-event="pendingEvent"
          :reset-form="resetForm"
          :dialog="dialog"
        />
      </template>
    </ModalComponent>

    <!--  dialog show details -->
    <ModalComponent v-if="!isLoading && dialog === 'details'" full>
      <template #default>

        <div v-if="currentEvent" class="bg-white text-brown-dark p-5 rounded-md w-2/6 h-auto flex flex-col items-start justify-start gap-4">
          <h2 class="self-center font-bold text-xl w-full p-2 text-center">{{ t('mama.event.modal_title') }}</h2>
          <div class="mb-4">
            <p>
              <span class="font-bold">{{ t('mama.event.title') }}</span>:
              {{ currentEvent.title }}
            </p>
            <p>
              <span class="font-bold">{{ t('mama.event.description') }}</span>:
              {{ currentEvent.contentFull  }}
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
          <div class="flex justify-between items-center gap-2 w-full">
            <AppButton :label="t('general.close')" @click="dialog = 'none'" />
            <AppButton :label="t('general.delete')" @click="deleteEvent(currentEvent.id)" />
            <AppButton :label="t('general.edit')" @click="editEvent(currentEvent)" />
          </div>
        </div>
        <div v-else >
          {{ t('mama.event.no_details_event')}}
        </div>
      </template>
    </ModalComponent>
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
