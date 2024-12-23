import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageTax(): [
  number,
  (update: SetStateAction<number>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageTaxAtom = useMemo(
    () => focusAtom(shippingPackageAtom, (optic) => optic.prop('tax')),
    [shippingPackageAtom]
  );
  shippingPackageTaxAtom.debugLabel = `shippingPackageTaxAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageTaxAtom);
}
