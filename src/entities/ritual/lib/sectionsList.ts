import type { RitualSectionList } from "@/entities/ritual";
import { i18n } from '@/shared/config/i18n';
export const sectionsList: RitualSectionList[] = [
  {
    text: i18n.global.t('rituals.morning_rituals'),
    value: 'morning_rituals'
  },
  {
    text: i18n.global.t('rituals.evening_rituals'),
    value: 'evening_rituals'
  },
  {
    text: i18n.global.t('rituals.face_care'),
    value: 'face_care'
  },
  {
    text: i18n.global.t('rituals.my_rituals'),
    value: 'my_rituals'
  },
  {
    text: i18n.global.t('rituals.hair_care'),
    value: 'hair_care'
  },
  {
    text: i18n.global.t('rituals.body_care'),
    value: 'body_care'
  },
  {
    text: i18n.global.t('rituals.nails_care'),
    value: 'nails_care'
  },
]



