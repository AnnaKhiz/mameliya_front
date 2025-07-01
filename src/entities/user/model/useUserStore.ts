import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchData} from "@/shared/api";
import type {FormFieldsType, UserDataType, ResponseType, CalendarEventType} from "@/entities/user";


export const useUserStore = defineStore('user', () => {
  const user = ref<UserDataType | null>(null);
  const isAuthenticated = ref<boolean>(false);
  const userCalendarEvents = ref<CalendarEventType[] | null>(null);
  const isLoading = ref<boolean>(false);

  const updateIsAuthenticated = (value: boolean) => {
    isAuthenticated.value = value;
  }

  const signUpUser = async (body: FormFieldsType):Promise<any> => {
    let result: ResponseType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/register', 'POST', {}, body);
      isLoading.value = false;
      if (result?.data) {
        user.value = result?.data;
      }
      isAuthenticated.value = true;

    } catch (error) {
      console.error('Error [Sign up user]: ', error);
    }
    return result;
  }

  const signInUser = async (body: FormFieldsType):Promise<any> => {
    let result: ResponseType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/login', 'POST', {}, body);
      console.log(result)
      isLoading.value = false;
      if (result?.data) {
        user.value = result?.data;
      }
      isAuthenticated.value = true;
    } catch(error) {
      console.error('Error [Sign in user]: ', error);
    }
    return result;
  }

  const checkUserSession = async (): Promise<any> => {
    let result: ResponseType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/check-auth');
      isLoading.value = false;
      if (result) {
        if (result?.data) {
          user.value = result.data;
        }

        isAuthenticated.value = result.result;
        localStorage.setItem('userAuthenticated', JSON.stringify(result.result));
      }

    } catch(error) {
      console.error('Error [Check auth user]: ', error);
    }
    return result;
  }

  const logOutUser = async (): Promise<any> => {
    let result: Record<string, boolean> | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/logout');
      isLoading.value = false;
      user.value = null;
      isAuthenticated.value = false;
      localStorage.setItem('userAuthenticated', 'false');

    } catch(error) {
      console.error('Error [Log out user]: ', error);
    }
    return result;
  }

  const googleCalendarEvents = async (type: string): Promise<any> => {
    let result: Record<string, any> | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/google/events/:type', 'GET', { type });
      isLoading.value = false;
      userCalendarEvents.value = parseUserCalendarEvents(result?.data?.events);
      console.log('userCalendarEvents.value', userCalendarEvents.value)
      // userCalendarEvents.value = result?.data?.events;
    } catch(error) {
      console.error('Error [CAL EVENTS]: ', error);
    }
    return result;
  }

  const addNewEventToCalendar = async ( { body, type } : { body: CalendarEventType, type: string }): Promise<any> => {
    let result: Record<string, any> | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/google/event/add/:type', 'POST', { type }, body);
      console.log('[ADD EVENT] result', result)
      isLoading.value = false;
      const resultArray = [];
      resultArray.push(result?.data)
      const parsedEvent: CalendarEventType[] = parseUserCalendarEvents(resultArray);
      userCalendarEvents.value?.push(...parsedEvent)
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
      console.log('[remove response]', result)
      isLoading.value = false;
    } catch(error) {
      console.error('Error [DELETE EVENT FROM CAL]: ', error);
    }
    return result;
  }

  const parseUserCalendarEvents = (result: CalendarEventType[]) => {
    console.log('result', result)


    return result.map((e: Record<string, any>) => {

      return {
        start: new Date(e.start.dateTime || e.start.date),
        end: new Date(e.end.dateTime || e.end.date),
        title: e.summary || 'No title',
        content: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" class="size-4">\n' +
          '  <path d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z" />\n' +
          '</svg>\n',
        contentFull: e.description || '',
        backgroundColor: 'pink',
        color: '#523629',
        id: e.id,
        isAllDay: false
      }
    }).filter((elem: Record<string, any>) => elem.start && elem.end)

  }

  const updateUserCalendarEvents = (event: CalendarEventType) => {
    userCalendarEvents.value?.push(event);
  }

  return {
    user,
    isAuthenticated,
    userCalendarEvents,
    isLoading,
    signUpUser,
    signInUser,
    logOutUser,
    updateIsAuthenticated,
    checkUserSession,
    googleCalendarEvents,
    addNewEventToCalendar,
    removeGoogleCalendarEvent,
    updateUserCalendarEvents
  }
})
