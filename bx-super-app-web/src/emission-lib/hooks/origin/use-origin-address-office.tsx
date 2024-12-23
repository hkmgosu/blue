import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAddressOfficeAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('office')
);
originAddressOfficeAtom.debugLabel = 'originAddressOfficeAtom';

export function useOriginAddressOffice(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAddressOfficeAtom);
}
