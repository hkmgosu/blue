import { atom } from 'jotai';

import {
  joinToBusinessSchema,
  joinToBusinessRutSchema,
} from 'utils/validations/business/join-to-business.validation';
import { validateSchema } from 'utils/validate-schema';

export const joinToBusinessSocialReasonAtom = atom('');

export const joinToBusinessSocialReasonIsValidAtom = atom((get) => {
  const socialReason = get(joinToBusinessSocialReasonAtom);
  return validateSchema(joinToBusinessRutSchema, {
    social_reason: socialReason,
  });
});

export const joinToBusinessValuesAtom = atom((get) => {
  return {
    social_reason: get(joinToBusinessSocialReasonAtom),
  };
});

export const joinToBusinessValuesIsValidAtom = atom((get) => {
  const values = get(joinToBusinessValuesAtom);

  return joinToBusinessSchema.isValid({ ...values });
});

export const joinToBusinessIsLoadingAtom = atom(false);

export const joinToBusinessIsErrorAtom = atom(false);

export const joinToBusinessErrorAtom = atom<string | null>(null);

export const joinToBusinessIsSuccessAtom = atom(false);
