import { useAtom, SetStateAction } from 'jotai';

import { useShippingContext } from '../../contexts/shipping-context';
import { ShippingStoreType } from '../../types';

export function useShipping(): [
  ShippingStoreType,
  (update: SetStateAction<ShippingStoreType>) => void
] {
  const { shippingAtom } = useShippingContext();
  return useAtom(shippingAtom);
}
