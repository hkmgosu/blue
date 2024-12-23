import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';

const massiveProgressAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('progress')
);
massiveProgressAtom.debugLabel = 'massiveProgressAtom';

export function useMassiveProgress(): [
  number,
  (update: SetStateAction<number>) => void
] {
  return useAtom(massiveProgressAtom);
}
