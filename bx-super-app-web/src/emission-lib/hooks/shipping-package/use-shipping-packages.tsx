import { useMemo } from 'react';
import { useAtom, SetStateAction, WritableAtom } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingContext } from '../../contexts/shipping-context';
import { ShippingPackageType } from '../../types';
import { splitAtom } from 'jotai/utils';

export function useShippingPackages(): [
  WritableAtom<ShippingPackageType, SetStateAction<ShippingPackageType>>[],
  (
    update: WritableAtom<
      ShippingPackageType,
      SetStateAction<ShippingPackageType>
    >
  ) => void
] {
  const { shippingAtom } = useShippingContext();
  const shippingPackages = useMemo(
    () => splitAtom(focusAtom(shippingAtom, (optic) => optic.prop('package'))),
    [shippingAtom]
  );
  shippingPackages.debugLabel = `shippingPackages-${shippingAtom.toString()}`;
  return useAtom(shippingPackages);
}
