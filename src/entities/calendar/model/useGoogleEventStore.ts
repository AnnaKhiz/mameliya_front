import {defineStore} from "pinia";
import {ref} from "vue";
import type { CalendarEventType } from "@/entities/calendar";
import {fetchData} from "@/shared/api";

export const useGoogleEventStore = defineStore('googleEvents', () => {
  const userCalendarEvents = ref<CalendarEventType[] | null>(null);
  const generalUserEvents = ref<CalendarEventType[] | null>(null);
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
      if (type === 'all') {
        generalUserEvents.value = result?.data?.events
          .filter((event: Record<string, any>) => event.calendarName && (event.calendarName === 'beauty' || event.calendarName === 'family'));
      } else {
        userCalendarEvents.value = result?.data?.events;
      }

      console.log('EVENT LIST: ', generalUserEvents.value)
      console.log('EVENT LIST: ', userCalendarEvents.value)
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

  const updateGoogleEvent = async(
    { type, eventId, body }: { type: string, eventId: string, body: CalendarEventType }
  ): Promise<any> => {
    let result: CalendarEventType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/google/event/update/:type/:eventId', 'PATCH', { type, eventId }, body);
      isLoading.value = false;
      updateUserCalendarEvents(result?.data);
    } catch(error) {
      console.error('Error [UPDATE EVENT FROM CAL]: ', error);
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

// ADDITIONAL FUNCTIONS
  const removeEventFromArray = (eventId: string) => {
    const index: number = userCalendarEvents.value?.findIndex(event => event.id === eventId) ?? -1;

    if (index === -1) return userCalendarEvents.value;

    userCalendarEvents.value?.splice(index, 1);
  }

  const updateUserCalendarEvents = (data: CalendarEventType) => {
    const index: number = userCalendarEvents.value?.findIndex(e => e.id === data.id) ?? -1;

    if (index === -1) return userCalendarEvents.value;

    if (userCalendarEvents.value) {
      userCalendarEvents.value[index] = data;
    }
  }

  return {
    userCalendarEvents,
    generalUserEvents,
    isLoading,
    googleCalendarEvents,
    addNewEventToCalendar,
    removeGoogleCalendarEvent,
    connectGoogleCalendar,
    updateGoogleEvent
  }
})
