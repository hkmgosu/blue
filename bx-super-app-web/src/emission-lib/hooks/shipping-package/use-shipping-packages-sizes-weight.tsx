import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageSizesWeight(): [
  number,
  (update: SetStateAction<number>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageSizesWeightAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) =>
        optic.prop('package_sizes').prop('weight')
      ),
    [shippingPackageAtom]
  );
  shippingPackageSizesWeightAtom.debugLabel = `shippingPackageSizesWeightAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageSizesWeightAtom);
}
