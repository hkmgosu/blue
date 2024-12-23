import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAddressComplement(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressComplementAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('complement')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressComplementAtom.debugLabel = `shippingDestinyAddressComplementAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressComplementAtom);
}
