import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { originAtom } from '../../store';
import { ShippingGeolocationType } from '../../types';

const originAddressGeolocationAtom = focusAtom(originAtom, (optic) =>
  optic.prop('address').prop('geolocation')
);
originAddressGeolocationAtom.debugLabel = 'originAddressGeolocationAtom';

export function useOriginAddressGeolocation(): [
  ShippingGeolocationType,
  (update: SetStateAction<ShippingGeolocationType>) => void
] {
  return useAtom(originAddressGeolocationAtom);
}
