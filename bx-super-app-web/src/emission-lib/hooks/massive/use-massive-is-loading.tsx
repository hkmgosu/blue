import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';

const massiveIsLoadingAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('isLoading')
);
massiveIsLoadingAtom.debugLabel = 'massiveIsLoadingAtom';

export function useMassiveIsLoading(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(massiveIsLoadingAtom);
}
