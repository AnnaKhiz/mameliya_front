import * as yup from 'yup';

export const userInfoValidationSchema = yup.object({
  email: yup.string().email('Неправильный формат email').required('Email обязателен'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен')
})
