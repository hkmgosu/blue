import { useAtom, SetStateAction } from 'jotai';

import { exitModalIsOpenAtom } from '../../store';

export function useExitModal(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(exitModalIsOpenAtom);
}
