import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "@/shared/api";
import type {
  FormFieldsType,
  UserDataType,
  ResponseType
} from "@/entities/user";


export const useUserStore = defineStore('user', () => {
  const user = ref<UserDataType | null>(null);
  const isAuthenticated = ref<boolean>(false);
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

  const updateUser = async (body: Record<string, any>) => {
    let result: ResponseType | null = null;
    isLoading.value = true;
    try {
      result = await fetchData('user/data/update', 'PATCH', {}, body);
      isLoading.value = false;
      if (result) {
        if (result?.data) {
          user.value = result.data;
        }
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

  return {
    user,
    isAuthenticated,
    isLoading,
    signUpUser,
    signInUser,
    logOutUser,
    updateIsAuthenticated,
    checkUserSession,
    updateUser,
    checkUserPassword
  }
})
