import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAddressStreet(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressStreetAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('street')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressStreetAtom.debugLabel = `shippingDestinyAddressStreetAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressStreetAtom);
}
