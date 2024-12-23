import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';

const promotionIdAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('promotion_id')
);
promotionIdAtom.debugLabel = 'promotionIdAtom';

export function usePromotionId(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(promotionIdAtom);
}
