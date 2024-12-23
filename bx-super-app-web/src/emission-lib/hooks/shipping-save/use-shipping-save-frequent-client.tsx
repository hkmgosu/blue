import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingSaveFrequentClient(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingSaveFrequentClientAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) => optic.prop('save_frequent_client')),
    [shippingAtom]
  );
  shippingSaveFrequentClientAtom.debugLabel = `shippingSaveFrequentClientAtom-${shippingAtom.toString()}`;
  return useAtom(shippingSaveFrequentClientAtom);
}
