import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';
import { ShippingGeolocationType } from '../../types';

export function useShippingDestinyAddressGeolocation(): [
  ShippingGeolocationType,
  (update: SetStateAction<ShippingGeolocationType>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressGeolocationAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('geolocation')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressGeolocationAtom.debugLabel = `shippingDestinyAddressGeolocationAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressGeolocationAtom);
}
