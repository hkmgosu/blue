import { useMemo } from 'react';
import { atom, SetStateAction, useAtom, WritableAtom } from 'jotai';

import { useShippings } from './use-shippings';
import { ShippingStoreType } from '../../types';

export function useShippingSelectedAtom(): [
  WritableAtom<ShippingStoreType, SetStateAction<ShippingStoreType>>,
  (
    update: SetStateAction<
      WritableAtom<ShippingStoreType, SetStateAction<ShippingStoreType>>
    >
  ) => void
] {
  const [shippingAtoms] = useShippings();
  const shippingSelectedAtom = useMemo(
    () => atom(shippingAtoms[0]),
    [shippingAtoms]
  );
  shippingSelectedAtom.debugLabel = 'shippingSelectedAtom';
  return useAtom(shippingSelectedAtom);
}
