import { useAtom, SetStateAction } from 'jotai';

import { modalTermsIsOpenAtom } from '../../store';

export function useModalTerms(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(modalTermsIsOpenAtom);
}
