import { atom } from 'jotai';

import {
  submitSchemaValidation,
  usernameSchemaValidation,
} from 'utils/validations/login/submit.validation';
import { validateSchema } from 'utils/validate-schema';

export const loginUsernameAtom = atom('');

export const loginUsernameIsValidAtom = atom(async (get) => {
  const username = get(loginUsernameAtom);
  return await validateSchema(usernameSchemaValidation, { username });
});

export const loginPasswordAtom = atom('');

export const loginSubmitAtom = atom((get) => {
  return {
    username: get(loginUsernameAtom),
    password: get(loginPasswordAtom),
  };
});

export const loginSubmitIsValidAtom = atom((get) => {
  const values = {
    username: get(loginUsernameAtom),
    password: get(loginPasswordAtom),
  };
  return submitSchemaValidation.isValid({ ...values });
});

export const loginIsLoadingAtom = atom(false);

export const loginFacebookIsLoadingAtom = atom(false);

export const loginGoogleIsLoadingAtom = atom(false);

export const loginIsErrorAtom = atom(false);

export const loginErrorAtom = atom<string | null>(null);

const MAX_TRIES = 3;

export const loginTriesLeft = atom(MAX_TRIES);

export const loginIsSuccessAtom = atom(false);
