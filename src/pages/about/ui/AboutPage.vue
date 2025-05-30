<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <main class="bg-gradient-main flex-1 self-stretch px-5 py-10">
    <h2 class="text-brown-dark font-extrabold text-2xl mb-5">{{ t('about.title') }}</h2>
    <section class="flex flex-col gap-4">
      <p>
        <span class="font-semibold text-brown-dark">Mameliya</span> {{ t('about.cozy_place') }}
      </p>
      <p>
        {{ t('about.you_will_find') }}
      </p>
      <h3 class="text-brown-dark font-semibold text-lg">{{ t('about.what_waiting') }}</h3>
      <ul>
        <li>
          🌼 <span class="font-semibold text-brown-dark">{{ t('about.mama_title') }}</span>
          {{ t('about.mama_description') }}
        </li>
        <li>
          👨‍👩‍👧‍👦 <span class="font-semibold text-brown-dark">{{ t('about.family_title') }}</span>
          {{ t('about.family_description') }}
        </li>
        <li>
          👶 <span class="font-semibold text-brown-dark">{{ t('about.children_title') }}</span>
          {{ t('about.children_description') }}
        </li>
        <li>
          🧘‍♀️ <span class="font-semibold text-brown-dark">{{ t('about.mental_health_title') }}</span>
          {{ t('about.mental_health_description') }}
        </li>
        <li>
          💄 <span class="font-semibold text-brown-dark">{{ t('about.rituals_title') }}</span>
          {{ t('about.rituals_description') }}
        </li>
      </ul>
      <p>
        {{ t('about.have_someone_to_talk') }}
        <span class="font-semibold text-brown-dark cursor-pointer">{{ t('about.helper') }}</span>
        {{ t('about.listen_help') }}
      </p>
      <p>
        {{ t('about.write_down') }}
        <span class="font-semibold text-brown-dark cursor-pointer">{{ t('about.diary') }}</span>
        {{ t('about.save_your_thoughts') }}
      </p>
      <p class="whitespace-pre-line">
        {{ t('about.you_are_not_alone') }}
      </p>
      <p class="whitespace-pre-line">
        {{ t('about.with_love') }} 💛
      </p>
    </section>
  </main>
</template>
