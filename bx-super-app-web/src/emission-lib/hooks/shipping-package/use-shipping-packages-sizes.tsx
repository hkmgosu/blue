import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';
import { ShippingPackageSizes } from '../../types';

export function useShippingPackageSizes(): [
  ShippingPackageSizes,
  (update: SetStateAction<ShippingPackageSizes>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageSizesAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) => optic.prop('package_sizes')),
    [shippingPackageAtom]
  );
  shippingPackageSizesAtom.debugLabel = `shippingPackageSizesAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageSizesAtom);
}
