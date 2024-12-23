import { useAtom, SetStateAction } from 'jotai';

import { originAtom } from '../../store';
import { ShippingOriginDestinyType } from '../../types';

export function useOrigin(): [
  ShippingOriginDestinyType,
  (update: SetStateAction<ShippingOriginDestinyType>) => void
] {
  return useAtom(originAtom);
}
