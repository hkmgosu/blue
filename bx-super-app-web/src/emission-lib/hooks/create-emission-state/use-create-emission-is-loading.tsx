import { focusAtom } from 'jotai/optics';
import { useAtom, SetStateAction } from 'jotai';

import { createEmissionStateAtom } from '../../store';

const createEmissionStateIsLoading = focusAtom(
  createEmissionStateAtom,
  (optic) => optic.prop('isLoading')
);
createEmissionStateIsLoading.debugLabel = 'createEmissionStateIsLoading';
export function useCreateEmissionIsLoading(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(createEmissionStateIsLoading);
}
