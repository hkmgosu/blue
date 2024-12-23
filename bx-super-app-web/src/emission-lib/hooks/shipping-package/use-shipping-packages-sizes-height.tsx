import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageSizesHeight(): [
  number,
  (update: SetStateAction<number>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageSizesHeightAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) =>
        optic.prop('package_sizes').prop('height')
      ),
    [shippingPackageAtom]
  );
  shippingPackageSizesHeightAtom.debugLabel = `shippingPackageSizesHeightAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageSizesHeightAtom);
}
