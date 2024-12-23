import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';

const massivePackageDangerousAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('packageDangerousAtom')
);
massivePackageDangerousAtom.debugLabel = 'massivePackageDangerousAtom';

export function useMassivePackageDangerous(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(massivePackageDangerousAtom);
}
