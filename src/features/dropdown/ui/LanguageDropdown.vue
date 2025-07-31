<script setup lang="ts">
import {LanguageIcon} from "@heroicons/vue/16/solid";
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { i18n } from '@/shared/config/i18n';
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
const { updateUser } = useUserStore();
const { isAuthenticated } = storeToRefs(useUserStore());

const { t } = useI18n();

const isDropdown = ref<boolean>(false);
const toggleDropdown = () => {
  isDropdown.value = !isDropdown.value;
}

const changeLanguage = async (value: 'ru' | 'en') => {
  if (!isAuthenticated.value) {
    i18n.global.locale.value = value;
  } else {
    await updateUser({ lang: value})
  }

  isDropdown.value = false;
}
</script>

<template>
  <div class="relative">
    <LanguageIcon class="w-7 fill-brown-dark cursor-pointer" @click="toggleDropdown"/>
    <div v-if="isDropdown" class="absolute -top-4 right-10 bg-white z-10 rounded w-32 shadow-2xl" >
      <p
        class="py-5 px-4 cursor-pointer hover:bg-brown-medium transition duration-500 rounded-t hover:text-white"
        @click="changeLanguage('en')"
      >
        {{ t('language.en') }}
      </p>
      <p
        class="py-5 px-4 cursor-pointer hover:bg-brown-medium transition duration-500 rounded-b hover:text-white"
        @click="changeLanguage('ru')"
      >
        {{ t('language.ru') }}
      </p>
    </div>
  </div>

</template>
