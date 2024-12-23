import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAgencyId(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAgencyIdAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('agency_id')
      ),
    [shippingAtom]
  );
  shippingDestinyAgencyIdAtom.debugLabel = `shippingDestinyAgencyIdAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAgencyIdAtom);
}
