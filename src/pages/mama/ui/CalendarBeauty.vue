<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {onMounted, watch, computed} from "vue";
import { useUserStore } from "@/entities/user";
import {AppButton} from "@/shared/ui/button";
const { googleCalendarEvents } = useUserStore();
const { userCalendarEvents } = storeToRefs((useUserStore()));
import { useRoute } from 'vue-router'
const route = useRoute();
const { t } = useI18n();
import { VueCal } from 'vue-cal';
import 'vue-cal/style'
import {storeToRefs} from "pinia";

const connectGoogleCalendar = () => {
  window.location.href = 'http://localhost:3000/user/google/check';
}

const calendarEventsList = computed(() => {
  const now = new Date();
  return userCalendarEvents?.value?.map((e: Record<string, any>) => {

    return {
      start: parseDateToString(e.start.dateTime || e.start.date),
      end: parseDateToString(e.end.dateTime || e.end.date),
      title: e.summary || 'No title',
      content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="size-4">\n' +
        '  <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />\n' +
        '</svg>\n',
      contentFull: e.description || '',
      class: 'beauty-rituals',
      id: e.id,
      backgroundColor: 'pink',
      color: '#523629',
    }
  }).filter((elem: Record<string, any>) => elem.start && elem.end)
})

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
const getGoogleCalendarEvents = async () => {
  await googleCalendarEvents();

  console.log('result', userCalendarEvents.value);

}

watch(() => route, (value) => {
  console.log(value)
}, { deep: true })

onMounted(async () => {

})

const openDialog = ({ event }) => {
  console.log(event)
}
</script>

<template>
  <div class="flex flex-col justify-start items-start h-full overflow-hidden p-5">
    <div class="w-full">
      <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.beauty_calendar') }}:</h2>
      <AppButton label="connect Google Calendar" class="mb-4 mr-4" @click.prevent="connectGoogleCalendar" ></AppButton>
      <AppButton label="get Google Calendar Events" @click.prevent="getGoogleCalendarEvents" ></AppButton>
    </div>

    <Vue-cal
      class="w-full"
      time-at-cursor
      events-on-month-view
      editable-events
      :min-event-width="0"
      :events="calendarEventsList"
      @event-click="openDialog"
    />

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
