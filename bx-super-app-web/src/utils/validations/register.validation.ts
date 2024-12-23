import { i18n } from 'i18next';
import * as Yup from 'yup';

export const registerValidationSchema = (i18: i18n): Yup.AnyObjectSchema =>
  Yup.object({
    name: Yup.string().required(i18.t('form.errors.name.required')),
    lastName: Yup.string().required(i18.t('form.errors.lastname.required')),
    email: Yup.string()
      .required(i18.t('form.errors.email.required'))
      .email(i18.t('form.errors.email.invalid')),
    confirmEmail: Yup.string()
      .email(i18.t('form.errors.email.invalid'))
      .oneOf([Yup.ref('email'), ''], i18.t('form.errors.email.match'))
      .required(i18.t('form.errors.email.required')),
    password: Yup.string()
      .required(i18.t('form.errors.password.required'))
      .min(10, i18.t('form.errors.password.min')),
    confirmPassword: Yup.string()
      .required(i18.t('form.errors.password.required'))
      .oneOf([Yup.ref('password'), ''], i18.t('form.errors.password.match')),
  });
