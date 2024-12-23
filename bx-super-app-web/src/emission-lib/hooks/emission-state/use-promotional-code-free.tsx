import { useAtom, SetStateAction } from 'jotai';

import { promotionalCodeIsFreeAtom } from '../../store';

export function usePromotionalCodeFree(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(promotionalCodeIsFreeAtom);
}
