import { useMemo } from 'react';
import { useShipping } from './use-shipping';

export function useShippingTotal(): {
  price: number;
  tax: number;
  warrantyValue: number;
} {
  const [shipping] = useShipping();
  const price = useMemo(
    () =>
      shipping.package.reduce(
        (acc, curr) => acc + curr.shipping_service.price,
        0
      ),
    [shipping.package]
  );
  const tax = useMemo(
    () => shipping.package.reduce((acc, curr) => acc + curr.tax, 0),
    [shipping.package]
  );
  const warrantyValue = useMemo(
    () => shipping.package.reduce((acc, curr) => acc + curr.warranty_value, 0),
    [shipping.package]
  );

  return {
    price,
    tax,
    warrantyValue,
  };
}
