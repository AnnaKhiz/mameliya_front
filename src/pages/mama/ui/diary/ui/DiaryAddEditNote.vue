<script setup lang="ts">
import { AppInputText } from "@/shared/ui/form";
import { TextEditor } from "@/shared/ui/text-editor";
import { AppButton } from "@/shared/ui/button";
import {onBeforeUnmount, onMounted, ref} from "vue";
import {type DiaryFormType, type DiaryObjectType, useMamaStore} from "@/entities/mama";
import { useI18n } from "vue-i18n";

const { addDiaryPost } = useMamaStore();
const { t } = useI18n();
const notifyMessage = ref<string>('');
const isError = ref<boolean>(false);
let timeoutId: ReturnType<typeof setTimeout>;

type Props = {
  isEdit?: boolean;
  customStyles?: string;
  item?: DiaryObjectType;
}

const props = defineProps<Props>();
const emits = defineEmits(['update:dialog']);
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
  await addDiaryPost(form.value);
}

const saveEditedPost = async () => {
  if (!checkEmptyFields()) return;
  emits('update:dialog', 'none');
  // await addDiaryPost(form.value)
}

onMounted(async () => {
  if (props.item) {
    form.value = {
      title: props.item.title,
      description: props.item.description
    }
  }
})
onBeforeUnmount(() => clearTimeout(timeoutId));
</script>

<template>
  <form
    class="flex flex-col justify-center items-center gap-3 mb-6"
    :class="isEdit ? 'w-full' : ''"
  >
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
    <div class="flex justify-center items-center gap-4">
      <AppButton
        :label="isEdit ? t('general.save') : t('general.send')"
        @click.prevent="isEdit ? saveEditedPost() : sendNewPost()"
      />
      <slot name="form-actions" />
    </div>
  </form>
</template>
