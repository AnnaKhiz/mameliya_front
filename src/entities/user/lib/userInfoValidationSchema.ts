import * as yup from 'yup';
import { i18n } from '@/shared/config/i18n';

export const userInfoValidationSchema = yup.object({
  age: yup.number().min(16, i18n.global.t('validation.age_not_less')).nullable(),
  email: yup.string().email(i18n.global.t('validation.wrong_email_format')).required(i18n.global.t('validation.email_required')),
})
