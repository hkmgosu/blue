import { useAtom, SetStateAction } from 'jotai';

import { errorStep2Atom } from '../../store';

export function useErrorStep2(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(errorStep2Atom);
}
