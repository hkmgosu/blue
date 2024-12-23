import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';

const discountAtom = focusAtom(storeAtom, (optic) => optic.prop('discount'));
discountAtom.debugLabel = 'discountAtom';

export function useDiscount(): [
  number,
  (update: SetStateAction<number>) => void
] {
  return useAtom(discountAtom);
}
