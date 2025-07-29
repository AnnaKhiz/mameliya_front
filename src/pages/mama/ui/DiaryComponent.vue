<script setup lang="ts">
import { ref } from 'vue';
import {useI18n} from "vue-i18n";
import {TextEditor} from "@/shared/ui/text-editor";

const { t } = useI18n();
const text = ref<string>('');
</script>

<template>
  <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.diary.title') }}</h2>
  <div class="text-brown-dark flex flex-col justify-between items-start gap-3 mb-6 w-full ">
    <TextEditor v-model="text" class="w-full min-h-60" />
  </div>
</template>

<style scoped>

</style>
