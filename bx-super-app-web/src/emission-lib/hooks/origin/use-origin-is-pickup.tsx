import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originIsPickupAtom = focusAtom(originAtom, (optic) =>
  optic.prop('isPickup')
);
originIsPickupAtom.debugLabel = 'originIsPickupAtom';

export function useOriginIsPickup(): [
  boolean | undefined,
  (update?: SetStateAction<boolean | undefined>) => void
] {
  return useAtom(originIsPickupAtom);
}
