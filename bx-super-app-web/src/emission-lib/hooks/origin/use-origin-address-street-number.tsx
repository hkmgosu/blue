import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAddressStreetNumberAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('street_number')
);
originAddressStreetNumberAtom.debugLabel = 'originAddressStreetNumberAtom';

export function useOriginAddressStreetNumber(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAddressStreetNumberAtom);
}
