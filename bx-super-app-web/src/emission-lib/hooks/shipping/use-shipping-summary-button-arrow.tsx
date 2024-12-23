import { useMemo } from 'react';
import { atom, useAtom, SetStateAction } from 'jotai';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingSummaryButtonArrow(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingSummaryButtonArrowAtom = useMemo(
    () => atom<boolean>(!shippingAtom),
    [shippingAtom]
  );
  shippingSummaryButtonArrowAtom.debugLabel = `shippingSummaryButtonArrowAtom-${shippingAtom.toString()}`;
  return useAtom(shippingSummaryButtonArrowAtom);
}
