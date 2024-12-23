import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';

const withPromotionAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('withPromotion')
);
withPromotionAtom.debugLabel = 'withPromotionAtom';

export function useWithPromotion(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(withPromotionAtom);
}
