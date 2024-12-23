import { useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { useShippingPackageContext } from '../../contexts/shipping-package-context';
import { useShippingPackageWarranty } from './use-shipping-packages-warranty';
import { useShippingPackageWarrantyValue } from './use-shipping-packages-warranty-value';

export function useShippingPackageWarrantyExtended(): number {
  const { shippingPackageAtom } = useShippingPackageContext();
  const [warranty] = useShippingPackageWarranty();
  const [warrantyValue] = useShippingPackageWarrantyValue();
  const shippingPackageWarrantyExtendedAtom = useMemo(
    () =>
      focusAtom(shippingPackageAtom, (optic) =>
        optic.prop('warranty_extended')
      ),
    [shippingPackageAtom]
  );
  shippingPackageWarrantyExtendedAtom.debugLabel = `shippingPackageWarrantyExtendedAtom-${shippingPackageAtom.toString()}`;
  const [warrantyExtented, setWarrantyExtended] = useAtom(
    shippingPackageWarrantyExtendedAtom
  );
  useEffect(() => {
    if (warranty && warrantyValue >= 85000) {
      setWarrantyExtended(warrantyValue * 0.006);
    } else {
      setWarrantyExtended(0);
    }
  }, [setWarrantyExtended, warranty, warrantyValue]);

  return warrantyExtented;
}
