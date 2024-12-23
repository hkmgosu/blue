import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingReceiverLastname(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingReceiverLastnameAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) =>
        optic.prop('receiver').prop('lastName')
      ),
    [shippingAtom]
  );
  shippingReceiverLastnameAtom.debugLabel = `shippingReceiverLastnameAtom-${shippingAtom.toString()}`;
  return useAtom(shippingReceiverLastnameAtom);
}
