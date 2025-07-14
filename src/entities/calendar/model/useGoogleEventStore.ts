import {defineStore} from "pinia";
import {ref} from "vue";
import type { CalendarEventType } from "@/entities/calendar";
import {fetchData} from "@/shared/api";

export const useGoogleEventStore = defineStore('googleEvents', () => {
  const userCalendarEvents = ref<CalendarEventType[] | null>(null);
  const generalUserEvents = ref<CalendarEventType[] | null>(null);
  const isLoading = ref<boolean>(false);

  const googleCalendarEvents = async (type: string): Promise<any> => {
    let result: Record<string, any> | null = null;
    let filteredResult: Record<string, any> | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/google/events/:type', 'GET', { type });
      isLoading.value = false;

      filteredResult = result?.data?.events;

    } catch(error) {
      console.error('Error [CAL EVENTS]: ', error);
    }
    return filteredResult;
  }

  const addNewEventToCalendar = async (
    { body, type } : { body: CalendarEventType, type: string }
  ): Promise<any> => {
    let result: Record<string, any> | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/google/event/add/:type', 'POST', { type }, body);
      isLoading.value = false;
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
      isLoading.value = false;
    } catch(error) {
      console.error('Error [DELETE EVENT FROM CAL]: ', error);
    }
    return result;
  }


  return {
    userCalendarEvents,
    generalUserEvents,
    isLoading,
    googleCalendarEvents,
    addNewEventToCalendar,
    removeGoogleCalendarEvent,
    updateGoogleEvent
  }
})
