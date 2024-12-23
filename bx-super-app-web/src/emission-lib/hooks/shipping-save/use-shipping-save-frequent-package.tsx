import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';

export function useShippingSaveFrequentPackage(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingSaveFrequentPackageAtom = useMemo(
    () =>
      focusAtom(shippingAtom, (optic) => optic.prop('save_frequent_package')),
    [shippingAtom]
  );
  shippingSaveFrequentPackageAtom.debugLabel = `shippingSaveFrequentPackageAtom-${shippingAtom.toString()}`;
  return useAtom(shippingSaveFrequentPackageAtom);
}
