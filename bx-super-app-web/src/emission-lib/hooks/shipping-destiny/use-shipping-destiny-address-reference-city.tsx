import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAddressCity(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressCityAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('city')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressCityAtom.debugLabel = `shippingDestinyAddressCityAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressCityAtom);
}
