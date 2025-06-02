import * as yup from 'yup';
import { i18n } from '@/shared/config/i18n';

export const registerValidationSchema = yup.object({
  email: yup.string().email(i18n.global.t('validation.wrong_email_format')).required(i18n.global.t('validation.email_required')),
  password: yup.string().min(6, i18n.global.t('validation.min_6_symbols')).required(i18n.global.t('validation.password_required')),
  passwordConfirm: yup.string()
    .min(6, i18n.global.t('validation.min_6_symbols'))
    .required( i18n.global.t('validation.password_confirm_required'))
    .oneOf([yup.ref('password')],  i18n.global.t('validation.different_passwords')),
})
