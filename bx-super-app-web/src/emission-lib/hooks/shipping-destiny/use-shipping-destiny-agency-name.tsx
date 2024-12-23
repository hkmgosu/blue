import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingDestinyAgencyName(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingDestinyAgencyNameAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('destiny').prop('agency_name')
      ),
    [shippingAtom]
  );
  shippingDestinyAgencyNameAtom.debugLabel = `shippingDestinyAgencyNameAtom-${shippingAtom.toString()}`;
  return useAtom(shippingDestinyAgencyNameAtom);
}
