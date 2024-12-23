import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';
import { ShippingRegionType } from '../../types';

export function useShippingDestinyAddressRegion(): [
  ShippingRegionType,
  (update: SetStateAction<ShippingRegionType>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressRegionAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('region')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressRegionAtom.debugLabel = `shippingDestinyAddressRegionAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressRegionAtom);
}
