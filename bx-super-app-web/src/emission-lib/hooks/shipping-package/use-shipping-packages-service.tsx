import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';
import { ShippingServiceType } from '../../types';

export function useShippingPackageService(): [
  ShippingServiceType,
  (update: SetStateAction<ShippingServiceType>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageServiceAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) => optic.prop('shipping_service')),
    [shippingPackageAtom]
  );
  shippingPackageServiceAtom.debugLabel = `shippingPackageServiceAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageServiceAtom);
}
