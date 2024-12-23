import * as Yup from 'yup';
import i18n from 'i18next';

export const submitSchemaValidation = Yup.object().shape({
  username: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .min(10)
    .matches(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{10,}$/gs),
});

export const usernameSchemaValidation = Yup.object().shape({
  username: Yup.string()
    .required(i18n.t('login.form.validations.email.required'))
    .email(i18n.t('login.form.validations.email.invalid')),
});

export const passwordSchemaValidation = Yup.object().shape({
  password: Yup.string()
    .required(i18n.t('login.form.validations.password.required'))
    .min(10, i18n.t('login.form.validations.password.length'))
    .matches(
      /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{10,}$/gs,
      i18n.t('register.form.errors.password_type')
    ),
});
