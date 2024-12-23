import * as Yup from 'yup';
import i18n from 'i18next';

export const submitSchemaValidation = Yup.object().shape({
  name: Yup.string().required(i18n.t('register.form.errors.multi')),
  lastname: Yup.string().required(i18n.t('register.form.errors.multi')),
  email: Yup.string().email().required(i18n.t('register.form.errors.multi')),
  confirmEmail: Yup.string()
    .email()
    .required(i18n.t('register.form.errors.multi')),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{8,}$/gs,
      i18n.t('register.form.errors.password_type')
    )
    .required(i18n.t('register.form.errors.multi')),
  confirmPassword: Yup.string()
    .min(8)
    .matches(
      /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{8,}$/gs,
      i18n.t('register.form.errors.password_type')
    )
    .required(i18n.t('register.form.errors.multi')),
});

export const nameSchemaValidation = Yup.object().shape({
  name: Yup.string().required(i18n.t('register.form.errors.multi')),
});

export const lastnameSchemaValidation = Yup.object().shape({
  lastname: Yup.string().required(i18n.t('register.form.errors.multi')),
});

export const emailSchemaValidation = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('register.form.errors.multi'))
    .required(i18n.t('register.form.errors.multi')),
});

export const confirmEmailSchemaValidation = Yup.object().shape({
  confirmEmail: Yup.string()
    .email(i18n.t('register.form.errors.confirm_email'))
    .required(i18n.t('register.form.errors.multi')),
});

export const passwordSchemaValidation = Yup.object().shape({
  password: Yup.string()
    .matches(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{8,}$/gs, {
      message: i18n.t('register.form.errors.password_type'),
    })
    .required(i18n.t('register.form.errors.multi')),
});

export const confirmPasswordSchemaValidation = Yup.object().shape({
  confirmPassword: Yup.string()
    .matches(
      /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{8,}$/gs,
      i18n.t('register.form.errors.password_type')
    )
    .required(i18n.t('register.form.errors.multi')),
});
