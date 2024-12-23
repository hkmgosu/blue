import { focusAtom } from 'jotai/optics';
import { useAtom, SetStateAction } from 'jotai';

import { createEmissionStateAtom } from '../../store';

const createEmissionStateIsSuccess = focusAtom(
  createEmissionStateAtom,
  (optic) => optic.prop('isSuccess')
);
createEmissionStateIsSuccess.debugLabel = 'createEmissionStateIsSuccess';
export function useCreateEmissionIsSuccess(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(createEmissionStateIsSuccess);
}
