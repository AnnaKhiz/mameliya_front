import { defineStore } from "pinia";
import {computed, ref, watch} from "vue";
import { fetchData } from "@/shared/api";
import type {
  FormFieldsType,
  UserDataType,
  ResponseType
} from "@/entities/user";
import { i18n } from '@/shared/config/i18n';

export const useUserStore = defineStore('user', () => {
  const user = ref<UserDataType | null>(null);
  const isAuthenticated = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const language = ref<"en" | "ru">("en");
  const isConfirmed = ref<boolean>(false);
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
        language.value = result?.data.lang;
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
        language.value = result?.data.lang;
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
          language.value = result?.data.lang;
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

  const updateUser = async (body: Record<string, any>) => {
    let result: ResponseType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/data/update', 'PATCH', {}, body);
      isLoading.value = false;

      if (result?.data) {
        user.value = result.data;
        language.value = result?.data.lang;
      }

    } catch(error) {
      console.error('Error [Check auth user]: ', error);
    }
    return result;

  }

  const checkUserPassword = async (body: Record<string, any>) => {
    let result: ResponseType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/password-check', 'POST', {}, body);
      isLoading.value = false;

    } catch(error) {
      console.error('Error [Check auth user]: ', error);
    }
    return result;
  }

  watch(() => language.value, (newLang: "en" | "ru") => {
    i18n.global.locale.value = newLang;
  }, { immediate: true });


  const updateIsConfirmed = (value: boolean) => {
    isConfirmed.value = value;
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    isConfirmed,
    language,
    signUpUser,
    signInUser,
    logOutUser,
    updateIsAuthenticated,
    checkUserSession,
    updateUser,
    checkUserPassword,
    updateIsConfirmed
  }
})
