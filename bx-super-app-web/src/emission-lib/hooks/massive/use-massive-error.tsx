import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';

const massiveErrorAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('error')
);
massiveErrorAtom.debugLabel = 'massiveErrorAtom';

export function useMassiveError(): [
  string | null,
  (update: SetStateAction<string | null>) => void
] {
  return useAtom(massiveErrorAtom);
}
