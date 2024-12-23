import { useAtom, SetStateAction } from 'jotai';

import { multiSelectedTabAtom } from '../../store';

export function useMultiSelectedTab(): [
  number,
  (update: SetStateAction<number>) => void
] {
  return useAtom(multiSelectedTabAtom);
}
