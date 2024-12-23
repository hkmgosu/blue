import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAddressDeptoAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('depto')
);
originAddressDeptoAtom.debugLabel = 'originAddressDeptoAtom';

export function useOriginAddressDepto(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAddressDeptoAtom);
}
