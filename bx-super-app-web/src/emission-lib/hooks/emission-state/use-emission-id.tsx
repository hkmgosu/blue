import { useAtom, SetStateAction } from 'jotai';

import { emissionIdAtom } from '../../store';

export function useEmissionId(): [
  string,
  (update: SetStateAction<string>) => void
] {
  return useAtom(emissionIdAtom);
}
