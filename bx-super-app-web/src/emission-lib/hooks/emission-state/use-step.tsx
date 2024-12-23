import { useAtom, SetStateAction } from 'jotai';

import { stepAtom } from '../../store';

export function useStep(): [number, (update: SetStateAction<number>) => void] {
  return useAtom(stepAtom);
}
