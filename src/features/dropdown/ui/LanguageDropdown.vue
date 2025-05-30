<script setup lang="ts">
import {LanguageIcon} from "@heroicons/vue/16/solid";
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
</script>

<template>
  <div class="relative">
    <LanguageIcon class="w-7 fill-brown-dark cursor-pointer"/>
    <div class="absolute -top-4 right-10 bg-white p-5 z-10" >
      <p class="p-4">{{ t('language.en') }}</p>
      <p class="p-4">{{ t('language.ru') }}</p>
    </div>
  </div>

</template>

<style scoped>

</style>
