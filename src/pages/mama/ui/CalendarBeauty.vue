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
  useGoogleEventStore, EventDetailsForm, EventInstruction
} from "@/entities/event";
const { userCalendarEvents, isLoading } = storeToRefs(useGoogleEventStore());
const {
  googleCalendarEvents,
  removeGoogleCalendarEvent,
  parseUserCalendarEvents,
  connectGoogleCalendar,
  updateGoogleEvent
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
import {XMarkIcon} from "@heroicons/vue/16/solid";

const dialog = ref<DialogEventsType>('none');
const events = ref<CalendarEventType[] | null>();
const pendingEvent = ref<PendingValueType | null>(null);
const vuecalRef = ref<InstanceType<typeof VueCal> | null>(null);
const message = ref<string>('');
const messageNotify = ref<string>('');
const currentEvent = ref<CalendarEventType | null>(null);
const formEventData = ref<FormEventType>({
  title: '',
  description: '',
  date: '',
  start: '',
  end: ''
});

const createEvent = ( { event, resolve }: PendingValueType) => {
  const start = new Date(event.start);
  const todayDate = new Date();
console.log(todayDate , start)
  if (todayDate > start) {
    dialog.value = 'notify';
    messageNotify.value = t('mama.event.date_can_not_be_smaller');
    return;
  }


  openDialog('add');
  if (event.start) {
    pendingEvent.value = { event, resolve };
  }
  message.value = '';
}

const openDialog = (value: DialogEventsType) => {
  dialog.value = value;
}

const closeDialogs = () => {
  dialog.value = 'none';
}

const showDetails = ({ event }: { event: CalendarEventType}) => {
  dialog.value = 'details';

  currentEvent.value = {
    ...event,
    start: parseDateToString(event.start as string),
    end: parseDateToString(event.end as string)
  };
}
const dropEvent = async ({ event }: { event: CalendarEventType}) => {
  const { start, end } = event;
  const result = await updateGoogleEvent({
    body: {
      start,
      end
    },
    type: 'beauty',
    eventId: event.id
  })

  if (!result.result) {
    message.value = 'Updates not saved';
  }
  resetForm();
}
const resetForm = ():void => {
  closeDialogs();
  pendingEvent.value = null;
  formEventData.value = {
    title: '',
    description: '',
    date: '',
    start: '',
    end: ''
  }
}
const handleRemoveFromCal = (id: string) => {
  vuecalRef.value?.view.deleteEvent({ id }, 3);
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
    <div class="flex flex-col justify-start items-start h-full w-full overflow-hidden p-5 bg-gradient-main relative text-brown-dark ">
      <div v-if="!isLoading"  class="w-full">
        <div class="flex justify-between items-start">
          <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.beauty_calendar') }}:</h2>
          <p class="cursor-pointer font-semibold underline hover:text-brown-medium" @click="openDialog('instruction')">{{ t('mama.how_to_use') }}</p>
        </div>
        <div class="flex flex-col justify-between items-start gap-2 mb-6">
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
    </div>
    <!--  dialog add event -->
    <ModalComponent
      v-if="!isLoading && (dialog === 'add' || dialog === 'edit')"
      full
      :title="t('mama.event.modal_title')"
      @update:dialog-visibility="dialog = $event"
    >
      <template #default>
        <AddEditEventForm
          v-model="formEventData"
          :pending-event="pendingEvent"
          :reset-form="resetForm"
          :dialog="dialog"
          :current-event="currentEvent"
        />
      </template>
    </ModalComponent>

    <!--  dialog show details -->
    <ModalComponent
      v-if="!isLoading && dialog === 'details'"
      full
      :title="t('mama.event.modal_title')"
      @update:dialog-visibility="dialog = $event"
    >
      <template #default>
        <EventDetailsForm
          v-if="currentEvent"
          :dialog="dialog"
          :current-event="currentEvent"
          :close-dialogs="closeDialogs"
          @remove-from-cal="handleRemoveFromCal"
          @update:dialog="dialog = $event"
          @update:current-event="currentEvent = $event"
          @update:form-event-data="formEventData = $event"
        />
        <div v-else >
          {{ t('mama.event.no_details_event')}}
        </div>
      </template>
    </ModalComponent>

    <!-- dialog instruction   -->
    <ModalComponent
      v-if="dialog === 'instruction'"
      full
      :title="t('mama.how_to_use')"
      :width="'w-4/6'"
      @update:dialog-visibility="dialog = $event"
    >
      <template #default>
        <EventInstruction :close-dialogs="closeDialogs" />
      </template>
    </ModalComponent>

    <!-- dialog notify  -->
    <ModalComponent
      v-if="!isLoading && dialog === 'notify'"
      full
      :title="t('general.error')"
      @update:dialog-visibility="dialog = $event"
    >
      <template #default>
        <p>{{ messageNotify }}</p>
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
