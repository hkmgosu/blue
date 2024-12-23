import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';
import { ShippingRegionType } from '../../types';

const originAddressRegionAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('region')
);
originAddressRegionAtom.debugLabel = 'originAddressRegionAtom';

export function useOriginAddressRegion(): [
  ShippingRegionType,
  (update: SetStateAction<ShippingRegionType>) => void
] {
  return useAtom(originAddressRegionAtom);
}
