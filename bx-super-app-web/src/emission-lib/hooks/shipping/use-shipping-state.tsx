import { useAtom, SetStateAction } from 'jotai';

import { shippingsFocusAtom } from '../../store';
import { ShippingStoreType } from '../../types';

export function useShippingState(): [
  ShippingStoreType[],
  (update: SetStateAction<ShippingStoreType[]>) => void
] {
  return useAtom(shippingsFocusAtom);
}
