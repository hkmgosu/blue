import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAddressStreetAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('street')
);
originAddressStreetAtom.debugLabel = 'originAddressStreetAtom';

export function useOriginAddressStreet(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAddressStreetAtom);
}
