<script setup lang="ts">
import {AppButton} from "@/shared/ui/button";
import {fetchData} from "@/shared/api";
import { useUserStore } from "@/entities/user";
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
const { t } = useI18n();

type Props = {
  html?: string;
  text?: string;
  title?: string;
}

const props = defineProps<Props>();
const emits = defineEmits(['update:description']);
// const isTranslated =
const translateText = async () => {

  let lang = localStorage.getItem('locale');

  if (lang === 'en') {
    lang += '-US';
  }

  const body = {
    title: props.title,
    description: props.html,
    langSource: '',
    langResult: lang,
    tagHandling: 'html'
  }

  const response = await fetchData('user/translate', 'POST', {}, body)

  console.log(response)
  if (!response.result) {
    return
  }

  emits('update:description', response.data)

}



</script>
<template>
  <AppButton :label="t('general.translate')"  @click.prevent="translateText"/>
</template>
