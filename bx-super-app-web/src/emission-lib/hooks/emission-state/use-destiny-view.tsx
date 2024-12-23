import { useAtom, SetStateAction } from 'jotai';

import { destinyViewAtom } from '../../store';

export function useDestinyView(): [
  number,
  (update: SetStateAction<number>) => void
] {
  return useAtom(destinyViewAtom);
}
