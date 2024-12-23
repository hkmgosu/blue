import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageDangerousMerchandise(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageDangerousMerchandiseAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) =>
        optic.prop('dangerous_merchandise')
      ),
    [shippingPackageAtom]
  );
  shippingPackageDangerousMerchandiseAtom.debugLabel = `shippingPackageDangerousMerchandiseAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageDangerousMerchandiseAtom);
}
