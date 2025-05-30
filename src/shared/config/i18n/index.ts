import en from "@/shared/config/i18n/locales/en.json";
import ru from "@/shared/config/i18n/locales/ru.json";
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  locale: 'ru',
  globalInjection: true,
  fallbackLocale: 'en',
  messages: { en, ru }
})
