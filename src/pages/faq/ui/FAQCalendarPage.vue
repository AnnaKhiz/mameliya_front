<script setup lang="ts">
import { FAQCalendarInfo } from "@/pages/faq";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div>
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('aside.faq.faq_calendar') }}</h2>
  </div>

  <FAQCalendarInfo >
    <template #content>
      <div>
        <p>{{ t('mama.calendar.three_calendars')}}</p>
        <p>
          <span class="font-semibold">1. {{ t('mama.calendar.beauty_calendar')}}</span>
          - {{ t('mama.calendar.beauty_calendar_description')}}
        </p>
        <p>
          <span class="font-semibold">1. {{ t('mama.calendar.family_calendar')}}</span>
          - {{ t('mama.calendar.family_calendar_description')}}
        </p>
        <p>
          <span class="font-semibold">1. {{ t('mama.calendar.children_calendar')}}</span>
          - {{ t('mama.calendar.children_calendar_description')}}
        </p>
        <p>
          <span class="font-semibold">1. {{ t('mama.calendar.general_calendar')}}</span>
          - {{ t('mama.calendar.general_calendar_description')}}
        </p>
      </div>
    </template>
  </FAQCalendarInfo>
</template>
