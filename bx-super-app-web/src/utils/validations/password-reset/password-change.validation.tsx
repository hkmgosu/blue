import * as Yup from 'yup';
import i18n from 'i18next';

export const passwordChangeSchemaValidation = Yup.object().shape({
  username: Yup.string().email().required(),
  nonce: Yup.string().min(6).max(6).required(),
  password: Yup.string()
    .min(8)
    .matches(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{8,}$/gs)
    .required(),
  confirmPassword: Yup.string()
    .min(8)
    .matches(/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Z]).{8,}$/gs)
    .required(),
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
