<script setup lang="ts">
import loaderIcon from "@/shared/assets/images/loader.png";
import {useI18n} from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div class="fixed top-1/4 left-1/4 -translate-x-1/4 -translate-y-1/4 z-10 w-full h-full loader flex items-center justify-center pt-10">
    <div>
      <img
        :src="loaderIcon"
        alt="loader"
        :class="'w-32 animate-spin m-auto loader-duration'"
      >
      <h3 class="mt-4 text-brown-dark font-semibold text-md">{{ t('general.please_wait') }}...</h3>
    </div>
  </div>
</template>
