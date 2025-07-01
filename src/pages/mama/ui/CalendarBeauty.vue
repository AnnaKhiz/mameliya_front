<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {onMounted, watch, computed, ref, defineModel} from "vue";
import { useUserStore } from "@/entities/user";
import {AppButton} from "@/shared/ui/button";
const { googleCalendarEvents, user, removeGoogleCalendarEvent } = useUserStore();
const { userCalendarEvents, isLoading } = storeToRefs((useUserStore()));
import { useRoute } from 'vue-router'
const route = useRoute();
const { t } = useI18n();
import { VueCal } from 'vue-cal';
import 'vue-cal/style'
import {storeToRefs} from "pinia";
import ModalComponent from "@/shared/ui/modal";
import type { CalendarEventType } from "@/entities/user";
import { parseDateToString } from "@/shared/lib/parseDateToString.ts";
import LoaderComponent from "@/features/loader";
import { AddEditEventForm } from "@/entities/event";

const connectGoogleCalendar = () => {
  window.location.href = 'http://localhost:3000/user/google/check';
}
type FormEventType = {
  title: string;
  description: string;
}

const isDialogOpen = ref<boolean>(false);
const formEventData = ref<FormEventType>({
  title: '',
  description: ''
});


watch(() => route, (value) => {
  console.log(value)
}, { deep: true })

onMounted( async () => {
  if (user?.google_refresh) {
    await googleCalendarEvents('beauty');
  }
})

type PendingValueType = {
  event: CalendarEventType;
  resolve: ( event: CalendarEventType ) => {}
}
const pendingEvent = ref<PendingValueType | null>(null);
const createEvent = ( { event, resolve }: PendingValueType) => {
  openDialog()
  if (event.start) {
    pendingEvent.value = { event, resolve };
  }
  message.value = '';
}
const vuecalRef = ref<InstanceType<typeof VueCal> | null>(null)
const message = ref<string>('');
const openDialog = () => {
  isDialogOpen.value = true;
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
const editEvent = async (id: string) => {
  isDialogOpen.value = true;
  isDetails.value = false;
}

const dropEvent = ({ event }: { event: CalendarEventType}) => {
  console.log(event)
}

const resetForm = () => {
  isDialogOpen.value = false;
  pendingEvent.value = null;
  formEventData.value = {
    title: '',
    description: ''
  }
}
</script>

<template>
  <div class="flex flex-col justify-start items-start h-full w-full overflow-hidden p-5 bg-gradient-main relative">
    <code>{{ formEventData }}</code>
    <code>{{ isDialogOpen }}</code>
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
        v-model:events="userCalendarEvents"
        @event-create="createEvent"
        @event-click="showDetails"
        @event-drop = "dropEvent"
      />
    </div>
    <LoaderComponent v-else />
  </div>


  <!--  dialog add event -->
  <ModalComponent v-if="!isLoading && isDialogOpen" full>
    <template #content>
      <AddEditEventForm
        v-model="formEventData"
        :pending-event="pendingEvent"
        :reset-form="resetForm"
      />
    </template>
  </ModalComponent>

  <!--  dialog show details -->
  <ModalComponent v-if="!isLoading && isDetails"  full>
    <template #content>
      <div v-if="currentEvent" class="bg-white text-brown-dark p-5 rounded-md w-2/6 h-auto flex flex-col items-start justify-start gap-4">
        <h2 class="self-center font-bold text-xl w-full p-2 text-center">{{ t('mama.event.modal_title') }}</h2>
        <div class="mb-4">
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
        <div class="flex justify-between items-center gap-2 w-full">
          <AppButton :label="t('general.close')" @click="isDetails = false" />
          <AppButton :label="t('general.delete')" @click="deleteEvent(currentEvent.id)" />
          <AppButton :label="t('general.edit')" @click="editEvent(currentEvent.id)" />
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
