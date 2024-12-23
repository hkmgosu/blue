import { useAtomValue } from 'jotai/utils';

import { shippingTotalAtom } from '../../store';

export function useShippingsTotal(): {
  price: number;
  tax: number;
  warrantyValue: number;
} {
  return useAtomValue(shippingTotalAtom);
}
