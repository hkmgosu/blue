import { useMemo } from 'react';
import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';

export function useShippingPackageWarrantyBillNumber(): [
  string,
  (update: SetStateAction<string>) => void
] {
  const { shippingPackageAtom } = useShippingPackageContext();
  const shippingPackageWarrantyBillNumberAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) =>
        optic.prop('warranty_bill_number')
      ),
    [shippingPackageAtom]
  );
  shippingPackageWarrantyBillNumberAtom.debugLabel = `shippingPackageWarrantyBillNumberAtom-${shippingPackageAtom.toString()}`;
  return useAtom(shippingPackageWarrantyBillNumberAtom);
}
