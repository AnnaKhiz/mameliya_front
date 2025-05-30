import { en, ru } from "@/shared/config/i18n";
import { createI18n } from 'vue-i18n';

const savedLocale = localStorage.getItem('locale') as 'ru' | 'en' | null
const defaultLocale = savedLocale ?? 'ru'
export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  globalInjection: true,
  fallbackLocale: 'en',
  messages: { en, ru }
})
