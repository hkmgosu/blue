import { useAtom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai/optics';

import { massiveStoreAtom } from '../../store';

const massiveInputFileAtom = focusAtom(massiveStoreAtom, (optic) =>
  optic.prop('inputFile')
);
massiveInputFileAtom.debugLabel = 'massiveInputFileAtom';

export function useMassiveInputFile(): [
  File | null | undefined,
  (update?: SetStateAction<File | null | undefined>) => void
] {
  return useAtom(massiveInputFileAtom);
}
