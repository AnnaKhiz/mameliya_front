import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchData} from "@/shared/api";
import type {FormFieldsType, UserDataType, ResponseType} from "@/entities/user";


export const useUserStore = defineStore('user', () => {
  const user = ref<UserDataType | null>(null);
  const isAuthenticated = ref<boolean>(false);
  const userCalendarEvents = ref<Record<string, any> | null>(null);

  const updateIsAuthenticated = (value: boolean) => {
    isAuthenticated.value = value;
  }

  const signUpUser = async (body: FormFieldsType):Promise<any> => {
    let result: ResponseType | null = null;
    try {
      result = await fetchData('user/register', 'POST', {}, body);

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
    try {
      result = await fetchData('user/login', 'POST', {}, body);
      console.log(result)
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
    try {
      result = await fetchData('user/check-auth');

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
    try {
      result = await fetchData('user/logout');
      user.value = null;
      isAuthenticated.value = false;
      localStorage.setItem('userAuthenticated', 'false');

    } catch(error) {
      console.error('Error [Log out user]: ', error);
    }
    return result;
  }

  const googleCalendarEvents = async (): Promise<any> => {
    let result: Record<string, any> | null = null;
    try {
      result = await fetchData('user/google/events');
      userCalendarEvents.value = result?.data?.events;
    } catch(error) {
      console.error('Error [calendar events]: ', error);
    }
    return result;
  }

  return {
    user,
    isAuthenticated,
    userCalendarEvents,
    signUpUser,
    signInUser,
    logOutUser,
    updateIsAuthenticated,
    checkUserSession,
    googleCalendarEvents
  }
})
