import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingSaveFrequentRefund(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingSaveFrequentRefundAtom = useMemo(
    () => focusAtom(shippingAtom, (optic) => optic.prop('save_refund_address')),
    [shippingAtom]
  );
  shippingSaveFrequentRefundAtom.debugLabel = `shippingSaveFrequentRefundAtom-${shippingAtom.toString()}`;
  return useAtom(shippingSaveFrequentRefundAtom);
}
