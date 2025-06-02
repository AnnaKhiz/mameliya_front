import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchData} from "@/shared/api";
import type {FormFieldsType, UserDataType, ResponseType} from "@/entities/user";


export const useUserStore = defineStore('user', () => {
  const user = ref<UserDataType | null>(null);
  const isAuthenticated = ref<boolean>(false);

  const signUpUser = async (body: FormFieldsType):Promise<any> => {
    let result: ResponseType | null = null;
    try {
      result = await fetchData('api/user/register', 'POST', {}, body);

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
      result = await fetchData('api/user/login', 'POST', {}, body);

      if (result?.data) {
        user.value = result?.data;
      }
      isAuthenticated.value = true;
    } catch(error) {
      console.error('Error [Sign in user]: ', error);
    }
    return result;
  }

  const logOutUser = async (): Promise<any> => {
    let result: Record<string, boolean> | null = null;
    try {
      result = await fetchData('api/user/logout');
      user.value = null;
      isAuthenticated.value = false;
      localStorage.setItem('userAuthenticated', 'false');

    } catch(error) {
      console.error('Error [Sign in user]: ', error);
    }
    return result;
  }

  return {
    user,
    isAuthenticated,
    signUpUser,
    signInUser,
    logOutUser
  }
})
