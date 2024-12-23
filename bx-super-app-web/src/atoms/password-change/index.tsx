import { atom } from 'jotai';
import i18n from 'i18next';

import {
  passwordChangeSchemaValidation,
  passwordSchemaValidation,
  confirmPasswordSchemaValidation,
} from 'utils/validations/password-reset/password-change.validation';
import { validateSchema } from 'utils/validate-schema';

export const passwordChangePasswordAtom = atom('');

export const passwordChangePasswordIsValidAtom = atom((get) => {
  const password = get(passwordChangePasswordAtom);
  return validateSchema(passwordSchemaValidation, { password });
});

export const passwordChangeConfirmPasswordAtom = atom('');

export const passwordChangeConfirmPasswordIsValidAtom = atom((get) => {
  const password = get(passwordChangePasswordAtom);
  const confirmPassword = get(passwordChangeConfirmPasswordAtom);
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: i18n.t('register.form.errors.confirm_password'),
    };
  }
  return validateSchema(confirmPasswordSchemaValidation, { confirmPassword });
});

export const passwordChangeNonceAtom = atom<string | null>('');

export const passwordChangeUsernameAtom = atom<string | null>('');

export const passwordChangeValuesAtom = atom((get) => {
  return {
    username: get(passwordChangeUsernameAtom) || '',
    nonce: get(passwordChangeNonceAtom) || '',
    new_password: get(passwordChangePasswordAtom),
  };
});

export const passwordChangeValuesIsValidAtom = atom((get) => {
  const values = {
    username: get(passwordChangeUsernameAtom) || '',
    nonce: get(passwordChangeNonceAtom) || '',
    password: get(passwordChangePasswordAtom),
    confirmPassword: get(passwordChangeConfirmPasswordAtom),
  };

  return passwordChangeSchemaValidation.isValid({ ...values });
});

export const passwordChangeIsLoadingAtom = atom(false);

export const passwordChangeIsErrorAtom = atom(false);

export const passwordChangeErrorAtom = atom<string | null>(null);

export const passwordChangeIsSuccessAtom = atom(false);
