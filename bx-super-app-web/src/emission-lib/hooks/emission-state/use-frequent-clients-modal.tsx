import { useAtom, SetStateAction } from 'jotai';

import { frequentClientsModalAtom } from '../../store';

export function useFrequentClientsModal(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(frequentClientsModalAtom);
}
