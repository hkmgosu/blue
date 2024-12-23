import { useAtom, SetStateAction } from 'jotai';

import { openIsInvalidAtom } from '../../store';

export function useOpenIsInvalid(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(openIsInvalidAtom);
}
