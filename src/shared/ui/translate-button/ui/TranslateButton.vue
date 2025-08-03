<script setup lang="ts">
import { AppButton } from "@/shared/ui/button";
import { ref } from 'vue';
import { fetchData } from "@/shared/api";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

type Props = {
  html?: string;
  text?: string;
  title?: string;
  lang?: "en" | "ru";
}

const props = defineProps<Props>();
const emits = defineEmits(['update:description']);
const isTranslated = ref<boolean>(false);
const translateText = async ( direction: string = 'forward') => {
  isTranslated.value = !isTranslated.value;

  const langResult = (direction === 'forward')
    ? (props.lang === 'ru' ? 'en-US' : 'ru')
    : props.lang;

  const body = {
    title: props.title,
    description: props.html,
    langSource: langResult === 'ru' ? 'en' : 'ru',
    langResult,
    tagHandling: 'html'
  }

  const response = await fetchData('user/translate', 'POST', {}, body)

  if (!response.result) {
    return
  }

  emits('update:description', response.data);

}
</script>

<template>
  <AppButton
    v-if="!isTranslated"
    :label="t('general.translate')"
    @click.prevent="translateText()"
  />
  <AppButton
    v-else
    :label="t('general.reverse_translate')"
    @click.prevent="translateText('reverse')"
  />
</template>
