import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { storeAtom } from '../../store';

const shippingSaveFrequentOriginAtom = focusAtom(storeAtom, (optic) =>
  optic.prop('save_frequent_origin')
);
shippingSaveFrequentOriginAtom.debugLabel = `shippingSaveFrequentOriginAtom`;

export function useShippingSaveFrequentOrigin(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(shippingSaveFrequentOriginAtom);
}
