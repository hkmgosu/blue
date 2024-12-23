import { useAtom, SetStateAction } from 'jotai';

import { promotionalCodeIsFractionAtom } from '../../store';

export function usePromotionalCodeFraction(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(promotionalCodeIsFractionAtom);
}
