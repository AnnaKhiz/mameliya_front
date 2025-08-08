<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div>
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('aside.faq.faq_timer') }}</h2>
  </div>
  <div class="w-full flex flex-col items-start justify-start gap-3 px-5 pb-5 whitespace-pre-line">
    <p> {{ t('mama.timer.about') }}</p>
    <p> {{ t('mama.timer.time_limits') }}</p>
    <p> {{ t('mama.timer.notifications') }}</p>
    <h3 class="text-brown-dark font-semibold mt-2 text-md">{{ t('mama.timer.hot_to_use') }}</h3>
    <p>
      <span class="font-semibold">1.</span>
      {{ t('mama.timer.go_to_mama_section') }}
    </p>
    <p>
      <span class="font-semibold">2.</span>
      {{ t('mama.timer.start_timer') }}
    </p>
    <p>
      <span class="font-semibold">3.</span>
      {{ t('mama.timer.pause_timer') }}
    </p>
  </div>
</template>

