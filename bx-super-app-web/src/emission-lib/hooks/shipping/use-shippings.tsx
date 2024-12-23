import { useAtom, WritableAtom, SetStateAction } from 'jotai';

import { shippingAtomsAtom } from '../../store';
import { ShippingStoreType } from '../../types';

export function useShippings(): [
  WritableAtom<ShippingStoreType, SetStateAction<ShippingStoreType>>[],
  (
    update: WritableAtom<ShippingStoreType, SetStateAction<ShippingStoreType>>
  ) => void
] {
  return useAtom(shippingAtomsAtom);
}
