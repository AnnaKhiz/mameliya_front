import {defineStore} from "pinia";
import {ref} from "vue";
import type { CalendarEventType } from "@/entities/event";
import {fetchData} from "@/shared/api";

export const useGoogleEventStore = defineStore('googleEvents', () => {
  const userCalendarEvents = ref<CalendarEventType[] | null>(null);
  const isLoading = ref<boolean>(false);

  const connectGoogleCalendar = () => {
    window.location.href = 'http://localhost:3000/user/google/check';
  }
  const googleCalendarEvents = async (type: string): Promise<any> => {
    let result: Record<string, any> | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/google/events/:type', 'GET', { type });
      isLoading.value = false;
      userCalendarEvents.value = result?.data?.events;
    } catch(error) {
      console.error('Error [CAL EVENTS]: ', error);
    }
    return result;
  }

  const addNewEventToCalendar = async (
    { body, type } : { body: CalendarEventType, type: string }
  ): Promise<any> => {
    let result: Record<string, any> | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/google/event/add/:type', 'POST', { type }, body);
      isLoading.value = false;
      userCalendarEvents.value?.push(result?.data);
    } catch(error) {
      console.error('Error [ADD EVENT TO CAL]: ', error);
    }
    return result;
  }

  const removeGoogleCalendarEvent = async (
    { type, eventId }: { type: string, eventId: string }
  ): Promise<any> => {
    let result: Record<string, any> | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/google/event/remove/:type/:eventId', 'DELETE', { type, eventId });
      removeEventFromArray(result?.data.id);
      isLoading.value = false;
    } catch(error) {
      console.error('Error [DELETE EVENT FROM CAL]: ', error);
    }
    return result;
  }


  // additional functions
  const removeEventFromArray = (eventId: string) => {
    const index: number = userCalendarEvents.value?.findIndex(event => event.id === eventId) ?? -1;

    if (index === -1) return userCalendarEvents.value;

    userCalendarEvents.value?.splice(index, 1);
  }
  const checkIsArray = (data: CalendarEventType[] | CalendarEventType) => {
    return Array.isArray(data);
  }
  const createParsedEvent = (event: Record<string, any>) => {
    return {
      start: new Date(event.start?.dateTime || event.start?.date),
      end: new Date(event.end?.dateTime || event.end?.date),
      title: event.summary || event.title || 'No title',
      content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="size-4">\n' +
        '  <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />\n' +
        '</svg>\n',
      contentFull: event.description || '',
      backgroundColor: 'pink',
      color: '#523629',
      id: event.id,
      isAllDay: false
    }
  }
  const parseUserCalendarEvents = (
    event: CalendarEventType | CalendarEventType[]
  ): CalendarEventType | CalendarEventType[] => {
    if (checkIsArray(event)) {
      return event.map((e: CalendarEventType) => createParsedEvent(e))
        .filter((elem: CalendarEventType) => elem.start && elem.end)
    }
    return createParsedEvent(event);
  }

  return {
    userCalendarEvents,
    isLoading,
    googleCalendarEvents,
    addNewEventToCalendar,
    removeGoogleCalendarEvent,
    parseUserCalendarEvents,
    connectGoogleCalendar
  }
})
