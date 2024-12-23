import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';
import { ShippingCommuneType } from '../../types';

export const originAddressCommuneAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('commune')
);
originAddressCommuneAtom.debugLabel = 'originAddressCommuneAtom';

export function useOriginAddressCommune(): [
  ShippingCommuneType,
  (update: SetStateAction<ShippingCommuneType>) => void
] {
  return useAtom(originAddressCommuneAtom);
}
