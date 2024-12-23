import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAddressDepto(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressDeptoAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('depto')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressDeptoAtom.debugLabel = `shippingDestinyAddressDeptoAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressDeptoAtom);
}
