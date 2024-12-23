import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageTotalValue(): [
  number,
  (update: SetStateAction<number>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageTotalValueAtom = useMemo(
    () => focusAtom(shippingPackageAtom, (optic) => optic.prop('total_value')),
    [shippingPackageAtom]
  );
  shippingPackageTotalValueAtom.debugLabel = `shippingPackageTotalValueAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageTotalValueAtom);
}
