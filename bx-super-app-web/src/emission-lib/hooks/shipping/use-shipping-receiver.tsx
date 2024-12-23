import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';
import { ShippingReceiverType } from '../../types';

export function useShippingReceiver(): [
  ShippingReceiverType,
  (update: SetStateAction<ShippingReceiverType>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingReceiverAtom = useMemo(
    () => focusAtom(shippingAtom, (optic) => optic.prop('receiver')),
    [shippingAtom]
  );
  shippingReceiverAtom.debugLabel = `shippingReceiverAtom-${shippingAtom.toString()}`;
  return useAtom(shippingReceiverAtom);
}
