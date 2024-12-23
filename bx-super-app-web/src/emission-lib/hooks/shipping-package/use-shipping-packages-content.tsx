import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageContent(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageContentAtom = useMemo(
    () => focusAtom(shippingPackageAtom, (optic) => optic.prop('content')),
    [shippingPackageAtom]
  );
  shippingPackageContentAtom.debugLabel = `shippingPackageContentAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageContentAtom);
}
