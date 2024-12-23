import { useAtom, SetStateAction } from 'jotai';

import { refundAtom } from '../../store';
import { ShippingOriginDestinyType } from '../../types';

export function useRefund(): [
  ShippingOriginDestinyType,
  (update: SetStateAction<ShippingOriginDestinyType>) => void
] {
  return useAtom(refundAtom);
}
