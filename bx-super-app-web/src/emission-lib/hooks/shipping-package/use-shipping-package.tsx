import { useAtom, SetStateAction } from 'jotai';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';
import { ShippingPackageType } from '../../types';

export function useShippingPackage(): [
  ShippingPackageType,
  (update: SetStateAction<ShippingPackageType>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  return useAtom(shippingPackageAtom);
}
