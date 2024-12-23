import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';

const termsDateAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('terms_and_conditions_accepted_date')
);
termsDateAtom.debugLabel = 'termsDateAtom';

export function useTermsDate(): [
  string | undefined,
  (update?: SetStateAction<string | undefined>) => void
] {
  return useAtom(termsDateAtom);
}
