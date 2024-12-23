import { useAtom, SetStateAction } from 'jotai';

import { nextModalOpenAtom } from '../../store';

export function useNextModalOpen(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(nextModalOpenAtom);
}
