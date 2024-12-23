import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAddressCountry(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressCountryAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('country')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressCountryAtom.debugLabel = `shippingDestinyAddressCountryAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressCountryAtom);
}
