import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';

const massiveInProgressAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('inProgress')
);
massiveInProgressAtom.debugLabel = 'massiveInProgressAtom';

export function useMassiveInProgress(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(massiveInProgressAtom);
}
