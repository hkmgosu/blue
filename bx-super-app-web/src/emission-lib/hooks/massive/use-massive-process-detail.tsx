import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';

const massiveProcessDetailAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('processDetail')
);
massiveProcessDetailAtom.debugLabel = 'massiveProcessDetailAtom';

export function useMassiveProcessDetail(): [
  {
    process: number;
    error: number;
  },
  (
    update: SetStateAction<{
      process: number;
      error: number;
    }>
  ) => void
] {
  return useAtom(massiveProcessDetailAtom);
}
