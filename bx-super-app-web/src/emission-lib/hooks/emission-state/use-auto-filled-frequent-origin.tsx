import { SetStateAction, useAtom } from 'jotai';

import { autoFilledFrequentOriginAtom } from '../../store';

export function useAutoFilledFrequentOrigin(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(autoFilledFrequentOriginAtom);
}
