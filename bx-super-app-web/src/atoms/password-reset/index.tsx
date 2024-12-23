import { atom } from 'jotai';

import { schemaValidation } from 'utils/validations/password-reset/schema.validation';
import { validateSchema } from 'utils/validate-schema';

export const passwordResetEmailAtom = atom('');

export const passwordResetEmailIsValidAtom = atom((get) => {
  const email = get(passwordResetEmailAtom);
  return validateSchema(schemaValidation, { email });
});

export const passwordResetIsLoadingAtom = atom(false);

export const passwordResetIsSuccessAtom = atom(false);

export const passwordResetIsErrorAtom = atom(false);

export const passwordResetErrorAtom = atom<string | null>(null);
