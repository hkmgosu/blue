import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';

const termsAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('terms_and_conditions_accepted')
);
termsAtom.debugLabel = 'termsAtom';

export function useTerms(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(termsAtom);
}
