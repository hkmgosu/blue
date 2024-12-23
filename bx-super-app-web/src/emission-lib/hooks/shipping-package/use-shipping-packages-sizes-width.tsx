import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageSizesWidth(): [
  number,
  (update: SetStateAction<number>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageSizesWidthAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) =>
        optic.prop('package_sizes').prop('width')
      ),
    [shippingPackageAtom]
  );
  shippingPackageSizesWidthAtom.debugLabel = `shippingPackageSizesWidthAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageSizesWidthAtom);
}
