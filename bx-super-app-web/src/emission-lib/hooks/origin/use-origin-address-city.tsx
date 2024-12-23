import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAddressCityAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('city')
);
originAddressCityAtom.debugLabel = 'originAddressCityAtom';

export function useOriginAddressCity(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAddressCityAtom);
}
