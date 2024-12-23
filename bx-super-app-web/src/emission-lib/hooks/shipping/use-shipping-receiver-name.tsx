import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingReceiverName(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingReceiverNameAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) => optic.prop('receiver').prop('name')),
    [shippingAtom]
  );
  shippingReceiverNameAtom.debugLabel = `shippingReceiverNameAtom-${shippingAtom.toString()}`;
  return useAtom(shippingReceiverNameAtom);
}
