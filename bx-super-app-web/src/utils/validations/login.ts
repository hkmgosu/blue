import * as Yup from 'yup';
import { i18n } from 'i18next';

export const loginValidation = (i18: i18n): any =>
  Yup.object({
    username: Yup.string()
      .required(i18.t('login.form.validations.email.required'))
      .email(i18.t('login.form:vaidations.email.invalid')),
    password: Yup.string()
      .required(i18.t('login.form.validations.password.required'))
      .min(10, i18.t('login.form.validations.password.length')),
  });
