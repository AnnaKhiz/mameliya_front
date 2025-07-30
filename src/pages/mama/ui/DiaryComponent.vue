<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from "vue-i18n";
import { TextEditor } from "@/shared/ui/text-editor";
import { AppButton } from "@/shared/ui/button";
import { AppInputText } from "@/shared/ui/form";

const { t } = useI18n();
const notifyMessage = ref<string>('');

type DiaryFormType = {
  text: string;
  title: string;
}

const form = ref<DiaryFormType>({
  text: '',
  title: ''
});
</script>

<template>
  <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.diary.title') }}</h2>
  <p class="mb-1">{{ t('mama.diary.description_1') }}</p>
  <p class="mb-5">{{ t('mama.diary.description_2') }}</p>
  <form class="flex flex-col justify-between items-start gap-3 mb-6 w-full ">
    <AppInputText
      v-model="form.title"
      :title="t('mama.diary.add_title')"
      class="w-full"
      styles="dark-mode"
      :placeholder="t('mama.diary.add_title_placeholder')"
    />
    <TextEditor
      v-model="form.text"
      class="w-full mb-2"
      :title="t('mama.diary.add_text')"
    />
    <p class="">{{ notifyMessage }}</p>
    <AppButton :label="t('general.send')" />
  </form>
</template>

