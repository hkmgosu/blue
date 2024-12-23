import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageWarrantyValue(): [
  number,
  (update: SetStateAction<number>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageWarrantyValueAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) => optic.prop('warranty_value')),
    [shippingPackageAtom]
  );
  shippingPackageWarrantyValueAtom.debugLabel = `shippingPackageWarrantyValueAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageWarrantyValueAtom);
}
