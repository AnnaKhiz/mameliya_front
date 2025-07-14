<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import {AppButton} from "@/shared/ui/button";

const { t } = useI18n();



const message = ref<string>('');
</script>

<template>
  <div class="flex flex-grow flex-col justify-between h-full w-full">
  <div class="h-full">
    ai
  </div>
  <div class="flex justify-between items-center gap-2">
    <input
      v-model="message"
      type="text"
      :placeholder="t('helper_ai.placeholder')"
      class="dark-mode w-full text-brown-dark"
    />
    <AppButton
      :label="t('general.send')"
      icon
      class="bg-brown-medium hover:bg-white rounded p-2 transition duration-500"
    />
  </div>
  </div>
</template>

<style scoped>

</style>
