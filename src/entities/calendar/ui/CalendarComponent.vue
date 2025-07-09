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
  calendar, type CalendarNames
} from "@/entities/calendar";

const { userCalendarEvents, generalUserEvents, isLoading } = storeToRefs(useGoogleEventStore());
const {
  googleCalendarEvents,
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

type Props = {
  type: CalendarNames;
}

const props = defineProps<Props>()
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
    type: event.name,
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

  const id = await calendar.removeEventRequest(props.type);
  if (!id) return;
  vuecalRef.value?.view.deleteEvent({ id }, 3);
  changeDialogState('none');
}

onMounted( async () => {
  if (user?.google_refresh) {
    await googleCalendarEvents(props.type);
    if (!userCalendarEvents.value || !generalUserEvents.value) return;

    if (generalUserEvents.value) {
      events.value = calendar.parseUserCalendarEvents(generalUserEvents.value, props.type) as CalendarEventType[];
      return;
    }
    events.value = calendar.parseUserCalendarEvents(userCalendarEvents.value, props.type) as CalendarEventType[];
  }
})


watch(() => userCalendarEvents.value, (newValue) => {
  if (newValue) {
    events.value = calendar.parseUserCalendarEvents(newValue, props.type) as CalendarEventType[];
  }
}, { deep: true})

watch(() => generalUserEvents.value, (newValue) => {
  if (newValue) {
    events.value = calendar.parseUserCalendarEvents(newValue, props.type) as CalendarEventType[];
  }
}, { deep: true})

watch(dialog, (newValue) => {
  if(newValue === 'none') {
    resetForm();
  }
})
</script>

<template>
  <div v-if="!isLoading">
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
