<script setup lang="ts">
import {AppButton} from "@/shared/ui/button";
import { ref } from 'vue';
import {fetchData} from "@/shared/api";
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
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

  let langResult = '';

  if (direction === 'forward') {
    console.log(direction)
    langResult = props.lang === 'ru' ? 'en-US' : 'ru';
  } else {
    console.log(direction)
    langResult = props.lang;
  }
  console.log(langResult)

  const body = {
    title: props.title,
    description: props.html,
    langSource: langResult === 'ru' ? 'en' : 'ru',
    langResult,
    tagHandling: 'html'
  }

  console.log('body', body)

  const response = await fetchData('user/translate', 'POST', {}, body)

  console.log(response)
  if (!response.result) {
    return
  }

  emits('update:description', response.data)

}



</script>
<template>
  <AppButton v-if="!isTranslated" :label="t('general.translate')"  @click.prevent="translateText()"/>
  <AppButton v-else :label="'Отменить перевод'"  @click.prevent="translateText('reverse')"/>
</template>
