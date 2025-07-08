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
  useGoogleEventStore,
  EventDetailsForm,
  EventInstruction,
  calendar
} from "@/entities/calendar";
const { userCalendarEvents, isLoading } = storeToRefs(useGoogleEventStore());
const {
  googleCalendarEvents,
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

const dialog = ref<DialogEventsType>('none');
const events = ref<CalendarEventType[] | null>();
const vuecalRef = ref<InstanceType<typeof VueCal> | null>(null);
const message = ref<string>('');
const messageNotify = ref<string>('');

const formEventData = ref<FormEventType>({
  title: '',
  description: '',
  date: '',
  start: '',
  end: ''
});

const createEvent = ( { event, resolve }: PendingValueType) => {
  messageNotify.value = calendar.validateEventDate(event);

  if (messageNotify.value) {
    dialog.value = 'notify';
    return;
  }

  calendar.handleCreateEvent({  event, resolve });
  changeDialogState('add');
}
const changeDialogState = (value: DialogEventsType) => {
  dialog.value = value;
}

const showDetails = ({ event }: { event: CalendarEventType}) => {
  changeDialogState('details');

  calendar.currentEvent = {
    ...event,
    start: parseDateToString(event.start as string),
    end: parseDateToString(event.end as string)
  }
}
const dropEvent = async ({ event }: { event: CalendarEventType}) => {
  const { start, end } = event;

  const startEvent = new Date(start);
  const todayDate = new Date();

  if (todayDate > startEvent) {
    dialog.value = 'notify';
    messageNotify.value = t('mama.calendar.date_can_not_be_smaller');
    if (events.value) {
      events.value = [...events.value?.map((event: CalendarEventType) => ({ ...event }))];
    }
    return;
  }

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
  changeDialogState('none');
  calendar.pendingEvent = null;

  formEventData.value = {
    title: '',
    description: '',
    date: '',
    start: '',
    end: ''
  }
}
const handleRemoveFromCal = async (event: boolean) => {
  if (!event) return;

  const id = await calendar.removeEventRequest('beauty');
  if (!id) return;
  vuecalRef.value?.view.deleteEvent({ id }, 3);
  changeDialogState('none');
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

watch(dialog, (newValue) => {
  if(newValue === 'none') {
    resetForm();
  }
})
</script>

<template>
  <section>
    <div class="flex flex-col justify-start items-start h-full w-full overflow-hidden p-5 bg-gradient-main relative text-brown-dark ">
      <div v-if="!isLoading"  class="w-full">
        <div class="flex justify-between items-start">
          <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.beauty_calendar') }}:</h2>
          <p class="cursor-pointer font-semibold underline hover:text-brown-medium" @click="changeDialogState('instruction')">{{ t('mama.how_to_use') }}</p>
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
    <!--  dialog add calendar -->
    <ModalComponent
      v-if="!isLoading && (dialog === 'add' || dialog === 'edit')"
      full
      :title="t('mama.calendar.modal_title')"
      @update:dialog-visibility="dialog = $event"
    >
      <template #default>
        <AddEditEventForm
          v-model="formEventData"
          :reset-form="resetForm"
          :dialog="dialog"
        />
      </template>
    </ModalComponent>

    <!--  dialog show details -->
    <ModalComponent
      v-if="!isLoading && dialog === 'details'"
      full
      :title="t('mama.calendar.modal_title')"
      @update:dialog-visibility="dialog = $event"
    >
      <template #default>
        <EventDetailsForm
          v-if="calendar.currentEvent"
          :dialog="dialog"
          :close-dialogs="changeDialogState"
          @remove-from-cal="handleRemoveFromCal"
          @update:dialog="dialog = $event"
          @update:form-event-data="formEventData = $event"
        />
        <div v-else >
          {{ t('mama.calendar.no_details_event')}}
        </div>
      </template>
    </ModalComponent>

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
