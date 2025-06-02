import {defineStore} from "pinia";
import {ref} from "vue";
import {fetchData} from "@/shared/api";
import type {FormFieldsType, UserDataType, ResponseType, FormSigInField} from "@/entities/user";


export const useUserStore = defineStore('user', () => {
  const user = ref<UserDataType | null>(null);

  const signUpUser = async (body: FormFieldsType) => {
    let result: ResponseType | null = null;
    try {
      result = await fetchData('api/user/register', 'POST', {}, body);

      if (result?.data) {
        user.value = result?.data;
      }

    } catch (error) {
      console.error('Error [Sign up user]: ', error);
    }
    return result;
  }

  const signInUser = async (body: FormFieldsType) => {
    let result: ResponseType | null = null;
    try {
      result = await fetchData('api/user/login', 'POST', {}, body);

      if (result?.data) {
        user.value = result?.data;
      }
    } catch(error) {
      console.error('Error [Sign in user]: ', error);
    }
  }

  return {
    user,
    signUpUser,
    signInUser
  }
})
