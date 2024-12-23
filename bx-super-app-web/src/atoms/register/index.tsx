import { atom } from 'jotai';
import i18n from 'i18next';

import {
  submitSchemaValidation,
  nameSchemaValidation,
  lastnameSchemaValidation,
  emailSchemaValidation,
  confirmEmailSchemaValidation,
  passwordSchemaValidation,
  confirmPasswordSchemaValidation,
} from 'utils/validations/register/submit.validation';
import { validateSchema } from 'utils/validate-schema';

export const registerNameAtom = atom('');

export const registerNameIsValidAtom = atom((get) => {
  const name = get(registerNameAtom);
  return validateSchema(nameSchemaValidation, { name });
});

export const registerLastnameAtom = atom('');

export const registerLastnameIsValidAtom = atom((get) => {
  const lastname = get(registerLastnameAtom);
  return validateSchema(lastnameSchemaValidation, { lastname });
});

export const registerEmailAtom = atom('');

export const registerEmailIsValidAtom = atom((get) => {
  const email = get(registerEmailAtom);
  return validateSchema(emailSchemaValidation, { email });
});

export const registerConfirmEmailAtom = atom('');

export const registerConfirmEmailIsValidAtom = atom((get) => {
  const email = get(registerEmailAtom);
  const confirmEmail = get(registerConfirmEmailAtom);
  if (email !== confirmEmail) {
    return {
      isValid: false,
      error: i18n.t('register.form.errors.confirm_email'),
    };
  }
  return validateSchema(confirmEmailSchemaValidation, { confirmEmail });
});

export const registerPasswordAtom = atom('');

export const registerPasswordIsValidAtom = atom((get) => {
  const password = get(registerPasswordAtom);
  return validateSchema(passwordSchemaValidation, { password });
});

export const registerConfirmPasswordAtom = atom('');

export const registerConfirmPasswordIsValidAtom = atom((get) => {
  const password = get(registerPasswordAtom);
  const confirmPassword = get(registerConfirmPasswordAtom);
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: i18n.t('register.form.errors.confirm_password'),
    };
  }
  return validateSchema(confirmPasswordSchemaValidation, { confirmPassword });
});

export const registerSubmitAtom = atom((get) => {
  return {
    name: get(registerNameAtom),
    lastname: get(registerLastnameAtom),
    email: get(registerEmailAtom),
    confirmEmail: get(registerConfirmEmailAtom),
    password: get(registerPasswordAtom),
    confirmPassword: get(registerConfirmPasswordAtom),
  };
});

export const registerSubmitIsValidAtom = atom((get) => {
  const values = {
    name: get(registerNameAtom),
    lastname: get(registerLastnameAtom),
    email: get(registerEmailAtom),
    confirmEmail: get(registerConfirmEmailAtom),
    password: get(registerPasswordAtom),
    confirmPassword: get(registerConfirmPasswordAtom),
  };

  return submitSchemaValidation.isValid({ ...values });
});

export const registerIsLoadingAtom = atom(false);

export const registerSuccessAtom = atom(false);
