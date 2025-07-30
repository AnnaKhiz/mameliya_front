<script setup lang="ts">
import { onBeforeUnmount, ref} from 'vue';
import { useI18n } from "vue-i18n";
import { TextEditor } from "@/shared/ui/text-editor";
import { AppButton } from "@/shared/ui/button";
import { AppInputText } from "@/shared/ui/form";
import type { DiaryFormType } from "@/entities/mama";
import { useMamaStore } from "@/entities/mama";

import { DiaryList } from "@/pages/mama";
const { addDiaryPost, getDiaryPostsList } = useMamaStore();

const { t } = useI18n();
const notifyMessage = ref<string>('');
const isError = ref<boolean>(false);
const isShowFull = ref<boolean>(false);
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

const toggleShowList = async () => {
  isShowFull.value = !isShowFull.value;
  await getDiaryPostsList()
}

const sendNewPost = async () => {
  if (!checkEmptyFields()) return;
  await addDiaryPost(form.value)
}

onBeforeUnmount(() => clearTimeout(timeoutId));

</script>

<template>
  <div class="flex justify-between items-center w-full ">
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('mama.diary.title') }}</h2>
    <div >
      <h2
        v-if="isShowFull"
        @click="toggleShowList"
        class="text-brown-dark font-semibold mb-4 text-xl cursor-pointer hover:underline hover:text-brown-medium transition-colors duration-500"
      >
        {{ t('mama.diary.hide_list') }}
      </h2>
      <h2
        v-else
        @click="toggleShowList"
        class="text-brown-dark font-semibold mb-4 text-xl cursor-pointer hover:underline hover:text-brown-medium transition-colors duration-500"
      >
        {{ t('mama.diary.show_list') }}
      </h2>
    </div>

  </div>

  <div v-if="!isShowFull">
    <p class="mb-1">{{ t('mama.diary.description_1') }}</p>
    <p class="mb-5">{{ t('mama.diary.description_2') }}</p>
    <form class="flex flex-col justify-between items-start gap-3 mb-6 w-full ">
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
  </div>
  <div
    v-else
    class="h-screen overflow-auto w-full"
    id="diary"
  >
    <DiaryList />
  </div>

</template>

<style scoped>
#diary::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  width: 2px;
  background: #735c52;
}

::-webkit-scrollbar-thumb {
  background: white;
}

</style>

