import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageWarranty(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageWarrantyAtom = useMemo(
    () => focusAtom(shippingPackageAtom, (optic) => optic.prop('warranty')),
    [shippingPackageAtom]
  );
  shippingPackageWarrantyAtom.debugLabel = `shippingPackageWarrantyAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageWarrantyAtom);
}
