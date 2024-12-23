import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingReceiverRut(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingReceiverRutAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) => optic.prop('receiver').prop('rut')),
    [shippingAtom]
  );
  shippingReceiverRutAtom.debugLabel = `shippingReceiverRutAtom-${shippingAtom.toString()}`;
  return useAtom(shippingReceiverRutAtom);
}
