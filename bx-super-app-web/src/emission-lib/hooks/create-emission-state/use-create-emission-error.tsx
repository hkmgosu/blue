import { focusAtom } from 'jotai/optics';
import { useAtom, SetStateAction } from 'jotai';

import { createEmissionStateAtom } from '../../store';

const createEmissionStateErrorAtom = focusAtom(
  createEmissionStateAtom,
  (optic) => optic.prop('error')
);
createEmissionStateErrorAtom.debugLabel = 'createEmissionStateErrorAtom';
export function useCreateEmissionError(): [
  string | null,
  (update: SetStateAction<string | null>) => void
] {
  return useAtom(createEmissionStateErrorAtom);
}
