import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAddressStreetNumber(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressStreetNumberAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('street_number')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressStreetNumberAtom.debugLabel = `shippingDestinyAddressStreetNumberAtom-${shippingAtom.toString()}`;
  return useAtom(
    focusAtom(shippingAtom, (optic) =>
      optic.prop('destiny').prop('address').prop('street_number')
    )
  );
}
