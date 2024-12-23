import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyIsPickup(): [
  boolean | undefined,
  (update?: SetStateAction<boolean | undefined>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyIsPickupAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('isPickup')
      ),
    [shippingAtom]
  );
  shippingDestinyIsPickupAtom.debugLabel = `shippingDestinyIsPickupAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyIsPickupAtom);
}
