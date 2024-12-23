import * as Yup from 'yup';
import i18n from 'i18next';

export const schemaValidation = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('password-reset.form.errors.email'))
    .required(i18n.t('register.form.errors.multi')),
});
