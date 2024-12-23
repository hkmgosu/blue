import { useEffect } from 'react';

import { usePaymentMethod } from '../emission-state';
import { useShippingPackageWarranty, useShippingPackageWarrantyValue } from '.';

export function useShippingPackageWarrantyUpdated(): null {
  const [warranty] = useShippingPackageWarranty();
  const [warrantyValue] = useShippingPackageWarrantyValue();
  const [paymentMethod, setPaymenthMethod] = usePaymentMethod();

  useEffect(() => {
    if (warranty && warrantyValue >= 85000 && paymentMethod === 'free') {
      setPaymenthMethod('webpay');
    }
  }, [warranty, warrantyValue, paymentMethod, setPaymenthMethod]);

  return null;
}
