<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { ChevronDoubleUpIcon, StarIcon, CheckCircleIcon, PlusCircleIcon } from "@heroicons/vue/16/solid";

const { t } = useI18n();
</script>

<template>
  <div>
    <h2 class="text-brown-dark font-semibold mb-4 text-xl">{{ t('aside.faq.faq_rituals') }}</h2>
  </div>
  <div class="w-full flex flex-col items-start justify-start gap-1 px-5 pb-5 whitespace-pre-line">
    <p class="mb-2">{{ t('rituals.go_to_page') }}</p>
    <p><span class="font-semibold">1.</span> {{ t('rituals.morning_rituals') }} </p>
    <p><span class="font-semibold">2.</span> {{ t('rituals.evening_rituals') }} </p>
    <p><span class="font-semibold">3.</span> {{ t('rituals.face_care') }} </p>
    <p><span class="font-semibold">4.</span> {{ t('rituals.hair_care') }} </p>
    <p><span class="font-semibold">5.</span> {{ t('rituals.body_care') }} </p>
    <p><span class="font-semibold">6.</span> {{ t('rituals.nails_care') }} </p>
    <p><span class="font-semibold">7.</span> {{ t('rituals.my_rituals') }} </p>

    <h3 class="text-brown-dark font-semibold mt-2 text-md">{{ t('rituals.main_description') }}</h3>
    <p>{{ t('rituals.tooltips') }}</p>
    <p>{{ t('rituals.open_page_with_details') }}</p>
    <p>{{ t('rituals.details_contains') }}</p>

    <h3 class="text-brown-dark font-semibold mt-2 text-md">{{ t('rituals.left_navigation') }}</h3>
    <p>{{ t('rituals.add_to_my_rituals_description') }}
      "<ChevronDoubleUpIcon class="w-5 inline" />"
      {{ t('rituals.toggle_checkboxes') }} </p>
    <p>{{ t('rituals.after_select_ritual') }}
      "<StarIcon class="w-5 inline" />",
      {{ t('rituals.click_add_to_favorite') }}
    </p>
    <p>{{ t('rituals.select_all_rituals') }} "<CheckCircleIcon class="w-5 inline" />".</p>
    <p>{{ t('rituals.click_menu_links') }}</p>

    <h3 class="text-brown-dark font-semibold mt-2 text-md">{{ t('rituals.add_ritual_subtitle') }}</h3>
    <p>{{ t('rituals.add_your_ritual') }} "<PlusCircleIcon class="w-5 inline" />"</p>
    <p>{{ t('rituals.fill_and_save') }}</p>
    <p>{{ t('rituals.info_add_tags') }}</p>
    <p>{{ t('rituals.add_tags') }}</p>

    <h3 class="text-brown-dark font-semibold mt-2 text-md">{{ t('rituals.remove_ritual_subtitle') }}</h3>
    <p>{{ t('rituals.click_icon_remove') }}
      "<StarIcon class="w-5 inline" />",
      {{ t('rituals.notify_before_remove') }}</p>
  </div>
</template>

<style scoped>

</style>
