import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingReceiverEmail(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingReceiverEmailAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) => optic.prop('receiver').prop('email')),
    [shippingAtom]
  );
  shippingReceiverEmailAtom.debugLabel = `shippingReceiverEmailAtom-${shippingAtom.toString()}`;
  return useAtom(shippingReceiverEmailAtom);
}
