import { en, ru } from "@/shared/config/i18n";
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  globalInjection: true,
  fallbackLocale: 'en',
  messages: { en, ru }
})
