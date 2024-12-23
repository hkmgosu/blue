import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';

const originAddressReferenceAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('reference')
);
originAddressReferenceAtom.debugLabel = 'originAddressReferenceAtom';

export function useOriginAddressReference(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(originAddressReferenceAtom);
}
