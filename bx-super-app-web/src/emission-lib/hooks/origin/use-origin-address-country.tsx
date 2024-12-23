import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAddressCountryAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('country')
);
originAddressCountryAtom.debugLabel = 'originAddressCountryAtom';

export function useOriginAddressCountry(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAddressCountryAtom);
}
