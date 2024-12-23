import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingReceiverPhone(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingReceiverPhoneAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) => optic.prop('receiver').prop('phone')),
    [shippingAtom]
  );
  shippingReceiverPhoneAtom.debugLabel = `shippingReceiverPhoneAtom-${shippingAtom.toString()}`;
  return useAtom(shippingReceiverPhoneAtom);
}
