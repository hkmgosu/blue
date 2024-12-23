import { SetStateAction, WritableAtom } from 'jotai';

import { useShippingContext } from '../../contexts/shipping-context';
import { ShippingStoreType } from '../../types';

export function useShippingAtom(): WritableAtom<
  ShippingStoreType,
  SetStateAction<ShippingStoreType>
> {
  const { shippingAtom } = useShippingContext();
  return shippingAtom;
}
