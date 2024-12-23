import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAddressOffice(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressOfficeAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('office')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressOfficeAtom.debugLabel = `shippingDestinyAddressOfficeAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressOfficeAtom);
}
