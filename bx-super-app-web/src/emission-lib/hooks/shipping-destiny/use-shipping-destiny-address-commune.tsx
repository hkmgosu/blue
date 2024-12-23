import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';
import { ShippingCommuneType } from '../../types';

export function useShippingDestinyAddressCommune(): [
  ShippingCommuneType,
  (update: SetStateAction<ShippingCommuneType>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAddressCommuneAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('address').prop('commune')
      ),
    [shippingAtom]
  );
  shippingDestinyAddressCommuneAtom.debugLabel = `shippingDestinyAddressCommuneAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAddressCommuneAtom);
}
