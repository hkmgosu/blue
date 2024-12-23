import { focusAtom } from 'jotai/optics';
import { useAtom, SetStateAction } from 'jotai';

import { createEmissionStateAtom } from '../../store';

const createEmissionStateIsError = focusAtom(createEmissionStateAtom, (optic) =>
  optic.prop('isError')
);
createEmissionStateIsError.debugLabel = 'createEmissionStateIsError';
export function useCreateEmissionIsError(): [
  boolean,
  (update: SetStateAction<boolean>) => void
] {
  return useAtom(createEmissionStateIsError);
}
