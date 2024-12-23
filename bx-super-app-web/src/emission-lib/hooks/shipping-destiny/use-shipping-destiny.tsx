import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';
import { ShippingOriginDestinyType } from '../../types';

export function useShippingDestiny(): [
  ShippingOriginDestinyType,
  (update: SetStateAction<ShippingOriginDestinyType>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAtom = useMemo(
    () => focusAtom(shippingAtom, (optic) => optic.prop('destiny')),
    [shippingAtom]
  );
  shippingDestinyAtom.debugLabel = `shippingDestinyAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAtom);
}
