import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageSizesLength(): [
  number,
  (update: SetStateAction<number>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageSizesLengthAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) =>
        optic.prop('package_sizes').prop('length')
      ),
    [shippingPackageAtom]
  );
  shippingPackageSizesLengthAtom.debugLabel = `shippingPackageSizesLengthAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageSizesLengthAtom);
}
