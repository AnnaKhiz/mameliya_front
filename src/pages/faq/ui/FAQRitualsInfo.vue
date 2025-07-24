<script setup lang="ts">
import {useI18n} from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div>
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('aside.faq.faq_rituals') }}</h2>
  </div>
  <div class="w-full flex flex-col items-start justify-start gap-3 px-5 pb-5 whitespace-pre-line">
    <p>При переходе на страницу "Ежедневные ритуалы" отображаются доступные разделы ритуалов красоты:</p>
    <p><span class="font-semibold">2.</span> {{ t('rituals.morning_rituals') }} </p>
    <p><span class="font-semibold">3.</span> {{ t('rituals.evening_rituals') }} </p>
    <p><span class="font-semibold">4.</span> {{ t('rituals.face_care') }} </p>
    <p><span class="font-semibold">3.</span> {{ t('rituals.hair_care') }} </p>
    <p><span class="font-semibold">4.</span> {{ t('rituals.body_care') }} </p>
    <p><span class="font-semibold">5.</span> {{ t('rituals.nails_care') }} </p>
    <p><span class="font-semibold">5.</span> {{ t('rituals.my_rituals') }} </p>
    <p>По клику на одном из разделов, открывается страница со списком доступных ритуалов в этом разделе в левой части окна. По нажатию на ритуал, справа откроется его описание.</p>
  </div>
</template>

<style scoped>

</style>
