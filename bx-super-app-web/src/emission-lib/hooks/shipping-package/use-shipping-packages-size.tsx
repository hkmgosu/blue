import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';
import { ShippingSizeType } from '../../types';

export function useShippingPackageSize(): [
  ShippingSizeType,
  (update: SetStateAction<ShippingSizeType>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackagePackageSizeAtom = useMemo(
    () => focusAtom(shippingPackageAtom, (optic) => optic.prop('size')),
    [shippingPackageAtom]
  );
  shippingPackagePackageSizeAtom.debugLabel = `shippingPackagePackageSizeAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackagePackageSizeAtom);
}
