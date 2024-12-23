import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';

const massiveIsSuccessAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('isSuccess')
);
massiveIsSuccessAtom.debugLabel = 'massiveIsSuccessAtom';

export function useMassiveIsSuccess(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(massiveIsSuccessAtom);
}
