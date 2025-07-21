<script setup lang="ts">
import { ref } from 'vue';
import { AppInputText } from "@/shared/ui/form";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import type { FormUserPageType } from "@/entities/user";
import {AppButton} from "@/shared/ui/button";

const formUserPage = ref<FormUserPageType>({
  email: '',
  password: '',
})
const emits = defineEmits(['update:edit']);
</script>

<template>
  <div class="w-full h-full">
    <form action="" class="px-3 flex flex-col gap-4 h-full">
      <AppInputText
        v-model="formUserPage.first_name"
        :title="t('user_page.user_name')"
        :placeholder="t('user_page.enter_user_name')"
        :styles="'dark-mode'"
      />
      <AppInputText
        v-model="formUserPage.last_name"
        :title="t('user_page.user_lastname')"
        :placeholder="t('user_page.enter_user_lastname')"
        :styles="'dark-mode'"
      />
      <AppInputText
        v-model.number="formUserPage.age"
        :title="t('user_page.user_age')"
        :placeholder="t('user_page.enter_age')"
        :styles="'dark-mode'"
      />
      <AppInputText
        v-model="formUserPage.email"
        :title="t('user_page.user_email')"
        :placeholder="t('user_page.enter_email')"
        :styles="'dark-mode'"
      />
      <AppInputText
        v-model="formUserPage.password"
        :title="t('user_page.password')"
        :placeholder="t('user_page.enter_password')"
        :styles="'dark-mode'"
      />
      <div class="flex justify-between items-center gap-4 mt-auto mb-5">
        <AppButton :label="t('general.cancel')"  @click.prevent="emits('update:edit', false)"/>
        <AppButton :label="t('general.send')" />
      </div>

    </form>


  </div>
</template>

<style scoped>

</style>
