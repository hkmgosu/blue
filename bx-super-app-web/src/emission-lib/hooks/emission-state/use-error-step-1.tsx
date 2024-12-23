import { useAtom, SetStateAction } from 'jotai';

import { errorStep1Atom } from '../../store';

export function useErrorStep1(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(errorStep1Atom);
}
