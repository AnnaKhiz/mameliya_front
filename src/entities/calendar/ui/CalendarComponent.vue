<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {onMounted, watch, ref, onBeforeUnmount, computed} from "vue";
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
  CalendarManager, type CalendarNames
} from "@/entities/calendar";

const { updateGoogleEvent } = useGoogleEventStore();
const { user } = useUserStore();
const { t } = useI18n();
// @ts-ignore
import { VueCal } from 'vue-cal';
import 'vue-cal/style';
import ModalComponent from "@/shared/ui/modal";
import { parseDateToString } from "@/shared/lib/parseDateToString.ts";
import LoaderComponent from "@/features/loader";

const calendar = ref<CalendarManager>(new CalendarManager());
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
  type: CalendarNames | 'all',
}

const props = defineProps<Props>()
const createEvent = ( { event, resolve }: PendingValueType) => {
  messageNotify.value = calendar.value.validateEventDate(event) || '';

  if (messageNotify.value) {
    dialog.value = 'notify';
    return;
  }

  calendar.value.handleCreateEvent({  event, resolve });
  changeDialogState('add');
}
const changeDialogState = (value: DialogEventsType) => {
  dialog.value = value;
}

const showDetails = ({ event }: { event: CalendarEventType}) => {
  changeDialogState('details');

  calendar.value.currentEvent = {
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
  calendar.value.pendingEvent = null;

  formEventData.value = {
    title: '',
    description: '',
    date: '',
    start: '',
    end: ''
  }
}

const calendarType = computed(() => props.type === 'all' ? calendar.value?.currentEvent?.name : props.type);
const handleRemoveFromCal = async (event: boolean) => {
  if (!event) return;

  const id = await calendar.value.removeEventRequest(calendarType.value);
  if (!id) return;
  vuecalRef.value?.view.deleteEvent({ id }, 3);
  changeDialogState('none');
}

onMounted( async () => {
  calendar.value.initStore();

  if (user?.google_refresh) {
    await calendar.value.handleGetEventsList(props.type);
    if (calendar.value.events) {
      events.value = calendar.value.parseUserCalendarEvents(calendar.value.events, props.type) as CalendarEventType[];
    }
  }
})


watch(() => calendar.value._events, (newValue) => {
  if (newValue) {
    events.value = calendar.value.parseUserCalendarEvents(newValue, props.type) as CalendarEventType[];
  }

}, { deep: true });

watch(dialog, (newValue) => {
  if(newValue === 'none') {
    resetForm();
  }
})

onBeforeUnmount(() => {
  events.value = null;
})
</script>

<template>
  <div v-if="!calendar.isLoading" class="w-full h-full">
    <AppButton
      v-if="!user?.google_refresh"
      :label="t('mama.connect_google_calendar')"
      class="mb-4 mr-4"
      @click.prevent="calendar.connectGoogleCalendar(props.type)"
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
    :show="!calendar.isLoading && (dialog === 'add' || dialog === 'edit')"
    full
    :title="t('mama.calendar.modal_title')"
    @update:dialog-visibility="dialog = $event"
  >
    <template #default>
      <AddEditEventForm
        v-model="formEventData"
        :reset-form="resetForm"
        :dialog="dialog"
        :calendar="calendar"
        :type="props.type"
      />
    </template>
  </ModalComponent>

  <!--  dialog show details -->
  <ModalComponent
    :show="!calendar.isLoading && dialog === 'details'"
    full
    :title="t('mama.calendar.modal_title')"
    @update:dialog-visibility="dialog = $event"
  >
    <template #default>
      <EventDetailsForm
        v-if="calendar.currentEvent"
        :calendar="calendar"
        :dialog="dialog"
        :close-dialogs="changeDialogState"
        :type="props.type"
        @remove-from-cal="handleRemoveFromCal"
        @update:dialog="dialog = $event"
        @update:form-event-data="formEventData = $event"
      />
      <div v-else >
        {{ t('mama.calendar.no_details_event')}}
      </div>
    </template>
  </ModalComponent>

  <!-- dialog notify  -->
  <ModalComponent
    :show="!calendar.isLoading && dialog === 'notify'"
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
  --vuecal-height: 90%;
}

.vuecal__event {
  background-color: #735c52;
}

</style>
