import { useAtom, SetStateAction } from 'jotai';

import { measureWidthAtom } from '../../store';

export function useMeasureWidth(): [
  number,
  (update: SetStateAction<number>) => void
] {
  return useAtom(measureWidthAtom);
}
