import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAddressReference(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressReferenceAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('reference')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressReferenceAtom.debugLabel = `shippingDestinyAddressReferenceAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressReferenceAtom);
}
