import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAddressComplementAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('complement')
);
originAddressComplementAtom.debugLabel = 'originAddressComplementAtom';

export function useOriginAddressComplement(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAddressComplementAtom);
}
