import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';

const promotionCodeAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('promotion_code')
);
promotionCodeAtom.debugLabel = 'promotionCodeAtom';

export function usePromotionCode(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(promotionCodeAtom);
}
