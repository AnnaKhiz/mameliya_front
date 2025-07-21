import * as yup from 'yup';

export const userInfoValidationSchema = yup.object({
  email: yup.string().email('Неправильный формат email').required('Email обязателен'),
})
