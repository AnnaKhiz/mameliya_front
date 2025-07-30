<script setup lang="ts">
import { AppInputText } from "@/shared/ui/form";
import { TextEditor } from "@/shared/ui/text-editor";
import { AppButton } from "@/shared/ui/button";
import { onBeforeUnmount, ref } from "vue";
import { type DiaryFormType, useMamaStore } from "@/entities/mama";
import { useI18n } from "vue-i18n";

const { addDiaryPost } = useMamaStore();
const { t } = useI18n();
const notifyMessage = ref<string>('');
const isError = ref<boolean>(false);
let timeoutId: ReturnType<typeof setTimeout>;

const form = ref<DiaryFormType>({
  description: '<p><br></p>',
  title: ''
});
const checkEmptyFields = () => {
  notifyMessage.value = '';
  isError.value = false;
  const { title, description } = form.value;

  if (!title || !description || description === '<p><br></p>') {
    notifyMessage.value = t('notify.empty_fields');
    isError.value = true;
    return false;
  }
  timeoutId = setTimeout(() => {
    notifyMessage.value = '';
  }, 1500);

  notifyMessage.value = t('notify.successfully_saved');
  isError.value = false;
  return true;
}

const sendNewPost = async () => {
  if (!checkEmptyFields()) return;
  await addDiaryPost(form.value)
}

onBeforeUnmount(() => clearTimeout(timeoutId));
</script>

<template>
  <form class="flex flex-col justify-center items-center gap-3 mb-6 ">
    <AppInputText
      v-model="form.title"
      :title="t('mama.diary.add_title')"
      class="w-full"
      styles="dark-mode"
      :placeholder="t('mama.diary.add_title_placeholder')"
      :error="!form.title && isError"
    />
    <TextEditor
      v-model="form.description"
      class="w-full mb-2"
      :title="t('mama.diary.add_text')"
      :error="!form.description || form.description === '<p><br></p>' && isError"
    />
    <p :class="isError ? 'text-red-600 text-sm' : 'text-green-900 text-sm'">{{ notifyMessage }}</p>
    <AppButton :label="t('general.send')" @click.prevent="sendNewPost" />
  </form>
</template>
